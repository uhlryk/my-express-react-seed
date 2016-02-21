var chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect;
var request = require('supertest');
var config = require('../../src/configs/server-test.local');
config = JSON.parse(JSON.stringify(config));
var httpStatus = require('http-status-codes');

var Server = require('../../dist/server.js');
var server = Server.config(config);
var app;
var serverResponse;
var USER_EMAIL = 'test@test.pl';
var USER_PASSWORD = '123456789';
var USER_NEW_PASSWORD = 'fdsdfsdfsdfs';
var USER_ID;
describe('Reset user password', function() {
  before(function(done) {
    app = server.listen(function(response) {
      serverResponse = response;
      response.actions.users.hashPassword(USER_PASSWORD, function(err, hashPassword) {
        response.actions.users.create({
          email: USER_EMAIL,
          password: hashPassword,
          status: response.models.user.STATUS.ACTIVE
        }, (err, user) => {
          USER_ID = user.id;
          done();
        });
      });
    });
  });
  it('should send email with password (check response status)', function(done){
    request(app)
      .post('/api/users/resetPassword')
      .send({email : USER_EMAIL})
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        done();
      });
  });
  it('should change user password', function(done){
    serverResponse.actions.users.createResetPasswordToken({
      id: USER_ID
    }, function(err, tokenResponse) {
      request(app)
        .post('/api/users/resetPassword/confirmation')
        .send({token : tokenResponse})
        .send({password : USER_NEW_PASSWORD})
        .end(function(err, res){
          expect(res.status).to.be.equal(httpStatus.OK);
          serverResponse.actions.users.list({
            id: USER_ID
          }, function(err, users) {
            serverResponse.actions.authentications.comparePassword(USER_NEW_PASSWORD, users[0].password, (error, response) => {
              expect(response).to.be.equal(true);
              done()
            });
          });
        });
    });
  });
  after(function(done){
    app.close();
    done();
  });
});
