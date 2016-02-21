var chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect;
var request = require('supertest');
var config = require('../../src/configs/server-test.local');
var httpStatus = require('http-status-codes');
var Promise = require('bluebird');

var Server = require('../../dist/server.js');
var server = Server.config(config);
var app;
describe('Check crud', function() {
  before(function(done) {
    app = server.listen(function(response) {
      /**
       * generate 30 items
       */
      return Promise.map([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30] , function(i) {
        return new Promise(function(resolve, rejest) {
          response.actions.items.create({
            name: 'name' + i
          }, function(err, item) {
            resolve(item);
          });
        });
      }).then(function() {
        done();
      });
    });
  });
  it('should show 20 default items list because limit is not send', function(done){
    request(app)
      .get('/api/items')
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        expect(res.body).to.have.length(20);
        done();
      });
  });
  it('should show 10 items list, because limit 10 is send', function(done){
    request(app)
      .get('/api/items')
      .query({'limit': 10})
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        expect(res.body).to.have.length(10);
        done();
      });
  });
  it('should show 20 default items list because limit has wrong value', function(done){
    request(app)
      .get('/api/items')
      .query({'limit': 15})
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        expect(res.body).to.have.length(20);
        done();
      });
  });
  it('should show 0 items list, because page send page doesn\' have values', function(done){
    request(app)
      .get('/api/items')
      .query({'page': 10})
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        expect(res.body).to.have.length(0);
        done();
      });
  });
  it('should show 10 items list, because page is 2 and there is only 11 items', function(done){
    request(app)
      .get('/api/items')
      .query({'page': 2})
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        expect(res.body).to.have.length(11);
        done();
      });
  });
  it('should show 20 items list, because page has wrong value and default page is in use', function(done){
    request(app)
      .get('/api/items')
      .query({'page': 'aa2'})
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        expect(res.body).to.have.length(20);
        done();
      });
  });
  after(function(done){
    app.close();
    done();
  });
});
