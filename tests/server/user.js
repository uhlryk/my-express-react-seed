var chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect;
var request = require('supertest');
var config = require('../../src/configs/server-test.local');
var httpStatus = require('http-status-codes');

var server = require('../../dist/server.js');
var app;
describe('Check user', function() {
  before(function(done) {
    app = server.run(config, function() {
      done()
    });
  });
  it('should allow to create user', function(done){
    request(app)
      .post('/users')
      .send({email : 'test1@test.test'})
      .send({password : 'somePassword'})
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        done();
      });
  });
  it('should disallow to create item when no params', function(done){
    request(app)
      .post('/items')
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.UNPROCESSABLE_ENTITY);
        done();
      });
  });
  var token;
  it('should authenticate user', function(done) {
    request(app)
      .post('/authentications')
      .send({email : 'test1@test.test'})
      .send({password : 'somePassword'})
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        expect(res.body.token).to.be.a("string");
        token = res.body.token;
        done();
      });
  });
  it('should verify user', function(done) {
    request(app)
      .get('/accounts')
      .set('access-token', token)
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        done();
      });
  });
  it('should not verify user when password incorrect', function(done) {
    request(app)
      .get('/accounts')
      .set('access-token', 'aaaaaaaaaaaa')
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
