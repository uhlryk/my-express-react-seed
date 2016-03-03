var chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect;
var request = require('supertest');
var config = require('../../src/configs/server-test.local');
config = JSON.parse(JSON.stringify(config));
config.enableEmailActivation = true;

var httpStatus = require('http-status-codes');
var Server = require('../../dist/server.js');
var server = Server.config(config);
var app;
var serverResponse;
var USER_EMAIL = 'test1@test.test';
var USER_ID;
describe('Activation user', function() {
  before(function(done) {
    app = server.listen(function(response) {
      serverResponse = response;
      done();
    });
  });
  it('should allow to create inactive user', function(done){
    request(app)
      .post('/api/users')
      .send({email : USER_EMAIL})
      .send({password : 'somePassword'})
      .end(function(err, res){
        serverResponse.actions.users.list({
          where: {
            email: USER_EMAIL
          }
        }, function(err, users) {
          expect(users[0]).to.include.property('status', serverResponse.models.user.STATUS.INACTIVE);
          USER_ID = users[0].id;
          done();
        });
      });
  });
  it('should activate inactive user', function(done){
    serverResponse.actions.users.createActivationToken({
      id: USER_ID
    }, function(err, tokenResponse) {
      request(app)
        .post('/api/users/activate')
        .send({token : tokenResponse})
        .end(function(err, res){
          expect(res.status).to.be.equal(httpStatus.OK);
          serverResponse.actions.users.list({
            where: {
              email: USER_EMAIL
            }
          }, function(err, users) {
            expect(users[0]).to.include.property('status', serverResponse.models.user.STATUS.ACTIVE);
            done();
          });
        });
    });
  });
  after(function(done){
    app.close();
    done();
  });
});
