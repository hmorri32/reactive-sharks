/* eslint-env node, mocha */

process.env.NODE_ENV = 'test';
const chai           = require('chai');
const expect         = chai.expect;
const assert         = chai.assert;
const chaiHttp       = require('chai-http');
const server         = require('../app.js');
const configuration  = require('../knexfile.js')['test'];
const database       = require('knex')(configuration);

chai.should();
chai.use(chaiHttp);


describe('testing our yung sharks', function() {
  it('should exist', () => {
    expect(server).to.exist;
  });
});

describe('server side testing', () => {

  before((done) => {
    database.migrate.latest()
    .then(() => database.seed.run())
    .then(() => done());
  });

  afterEach((done) => {
    database.seed.run()
    .then(() => done());
  });

  describe('client routes', () => {
    it(' / should render HTML', (done) => {
      chai.request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200)
        response.text.should.equal('<!DOCTYPE html><html><head><title>Express</title></head><body><h1>Express</h1><p>Welcome to Express</p></body></html>');
        done();
      });
    });

    it('should render HTML error for bogus route', () => {
      chai.request(server)
      .get('/ultrasweetroute')
      .end((error, response) => {
        response.should.have.status(404)
        response.text.should.equal('<!DOCTYPE html><html><head><title></title></head><body><h1>Not Found</h1><h2></h2><pre></pre></body></html>');
      });
    });
  });

  describe('yung API routes', () => {
    describe('GET /api/v1/sharks', () => {
      let cool = 'suh'
      cool.should.equal('suh')
    })
  })
});