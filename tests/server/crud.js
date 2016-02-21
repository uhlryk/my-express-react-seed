var chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect;
var request = require('supertest');
var config = require('../../src/configs/server-test.local');
var httpStatus = require('http-status-codes');

var Server = require('../../dist/server.js');
var server = Server.config(config);
var app;
describe('Check crud', function() {
  before(function(done) {
    app = server.listen(function() {
      done()
    });
  });
  it('should allow to create item', function(done){
    request(app)
      .post('/api/items')
      .send({name : 'dummy name'})
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        done();
      });
  });
  it('should disallow to create item when no params', function(done){
    request(app)
      .post('/api/items')
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.UNPROCESSABLE_ENTITY);
        done();
      });
  });
  it('should show items list', function(done){
    request(app)
      .get('/api/items')
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        done();
      });
  });
  it('should show single item', function(done){
    request(app)
      .get('/api/items/1')
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        done();
      });
  });
  it('should not find item when wrong id', function(done){
    request(app)
      .get('/api/items/100')
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.NOT_FOUND);
        done();
      });
  });
  it('should update item', function(done){
    request(app)
      .put('/api/items/1')
      .send({name : 'new dummy name'})
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        expect(res.body.name).to.be.equal('new dummy name');
        done();
      });
  });
  it('should not find when tried to update not existing item', function(done){
    request(app)
      .put('/api/items/100')
      .send({name : 'new dummy name'})
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.NOT_FOUND);
        done();
      });
  });
  it('should delete item', function(done){
    request(app)
      .delete('/api/items/1')
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.OK);
        done();
      });
  });
  it('should not find when tried to delete not existing item', function(done){
    request(app)
      .delete('/api/items/1')
      .end(function(err, res){
        expect(res.status).to.be.equal(httpStatus.NOT_FOUND);
        done();
      });
  });
  after(function(done){
    app.close();
    done();
  });
});
