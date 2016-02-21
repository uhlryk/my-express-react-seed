var chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect;
var request = require('supertest');
var config = require('../../src/configs/server-test.local');
var httpStatus = require('http-status-codes');

var Server = require('../../dist/server.js');
var server = Server.config(config);
var app;
var USER_EMAIL = 'test@test.pl';
var USER_PASSWORD = '123456789';
var USER_TOKEN;
var USER_ID;
describe('Check authentication crud', function() {
  before(function(done) {
    app = server.listen(function(response) {
      response.actions.users.hashPassword(USER_PASSWORD, function(err, hashPassword) {
        response.actions.users.create({
          email: USER_EMAIL,
          password: hashPassword,
          status: response.models.user.STATUS.ACTIVE
        }, (err, user) => {
          USER_ID = user.id;
          response.actions.authentications.createToken({
            id: USER_ID
          }, (error, tokenReponse) => {
            USER_TOKEN = tokenReponse;
            done();
          });
        });
      });
    });
  });
  it('should allow to create item', function(done){
    request(app)
      .post('/api/accounts/items')
      .set('access-token', USER_TOKEN)
      .send({name : 'dummy name'})
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        done();
      });
  });
  it('should disallow to create item when no token', function(done){
    request(app)
      .post('/api/accounts/items')
      .send({name : 'dummy name'})
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.UNAUTHORIZED);
        done();
      });
  });
  it('should show items list', function(done){
    request(app)
      .get('/api/accounts/items')
      .set('access-token', USER_TOKEN)
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        done();
      });
  });
  it('should disallow show items list when no token', function(done){
    request(app)
      .get('/api/accounts/items')
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.UNAUTHORIZED);
        done();
      });
  });
  it('should show single item', function(done){
    request(app)
      .get('/api/accounts/items/1')
      .set('access-token', USER_TOKEN)
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        done();
      });
  });
  it('should disallow  show single item when no token', function(done){
    request(app)
      .get('/api/accounts/items/1')
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.UNAUTHORIZED);
        done();
      });
  });
  it('should update item', function(done){
    request(app)
      .put('/api/accounts/items/1')
      .set('access-token', USER_TOKEN)
      .send({name : 'new dummy name'})
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        expect(res.body.name).to.be.equal('new dummy name');
        done();
      });
  });
  it('should disallow update item when no token', function(done){
    request(app)
      .put('/api/accounts/items/1')
      .send({name : 'new dummy name'})
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.UNAUTHORIZED);
        done();
      });
  });
  it('should delete item', function(done){
    request(app)
      .delete('/api/accounts/items/1')
      .set('access-token', USER_TOKEN)
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        done();
      });
  });
  it('should disallow delete item when no token', function(done){
    request(app)
      .delete('/api/accounts/items/1')
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.UNAUTHORIZED);
        done();
      });
  });
  after(function(done){
    app.close();
    done();
  });
});
