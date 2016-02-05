var chai = require("chai");
chai.use(require('chai-things'));
var expect = chai.expect;
var request = require('supertest');

var server = require('../../dist/server.js');
var app;
describe("Check server ", function() {
  beforeEach(function(done) {
    app = server.run({}, function() {
      done()
    });
  });
  it("should return status code 200 at empty get", function(done) {
    request(app)
    .get('/')
    .expect(200)
    .end(function(err, res) {
      done();
    })
  });
});
