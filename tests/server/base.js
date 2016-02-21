var chai = require("chai");
chai.use(require('chai-things'));
var expect = chai.expect;
var request = require('supertest');
var config = require('../../src/configs/server-test.local');

var Server = require('../../dist/server.js');
var server = Server.config(config);
var app;
describe("Check server ", function() {
  before(function(done) {
    app = server.listen(function() {
      done()
    });
  });
  it("should return status code 200 at empty get", function(done) {
    request(app)
    .get('/api/')
    .expect(200)
    .end(function(err, res) {
      done();
    })
  });
  after(function(done){
    app.close();
    done();
  });
});
