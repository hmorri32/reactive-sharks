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
        response.should.have.status(200);
        response.text.should.equal('<!DOCTYPE html><html><head><title>Express</title></head><body><h1>Express</h1><p>Welcome to Express</p></body></html>');
        done();
      });
    });

    it('should render HTML error for bogus route', () => {
      chai.request(server)
      .get('/ultrasweetroute')
      .end((error, response) => {
        response.should.have.status(404);
        response.text.should.equal('<!DOCTYPE html><html><head><title></title></head><body><h1>Not Found</h1><h2></h2><pre></pre></body></html>');
      });
    });
  });

  describe('yung API routes', () => {
    describe('GET /api/v1/sharks', () => {
      it('should return all sharks', (done) => {
        chai.request(server)
        .get('/api/v1/sharks')
        .end((error, response) => {
          const shark = response.body[0];

          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);

          shark.should.have.property('id');
          shark.should.have.property('name');
          shark.should.have.property('tagIdNumber');
          shark.should.have.property('species');
          shark.should.have.property('gender');
          shark.should.have.property('stageOfLife');
          shark.should.have.property('length');
          shark.should.have.property('weight');
          shark.should.have.property('tagDate');
          shark.should.have.property('tagLocation');
          shark.should.have.property('description');
          shark.should.have.property('pings');
          shark.should.have.property('dist_24_hours');
          shark.should.have.property('dist_72_hours');
          shark.should.have.property('dist_total');
          done();
        });
      });

      it('should GET sharks using that sweet sweet query string', (done) => {
        chai.request(server)
        .get('/api/v1/sharks?species=Great')
        .end((error, response) => {
          const steve = response.body[0];

          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);

          steve.id.should.equal(2);
          steve.name.should.equal('steve zissou');

          done();
        });
      });

      it('shuld chuck an error if passed bogus query data', (done) => {
        chai.request(server)
        .get('/api/v1/sharks?species=ultra cool shark')
        .end((error, response) => {
          response.should.have.status(500);
          response.should.be.html;
          response.text.should.equal('<!DOCTYPE html><html><head><title></title></head><body><h1>/Users/hugh/Turing/mod-4/reactive-sharks/views/error.jade:5\n    3| block content\n    4|   h1= message\n  &gt; 5|   h2= error.status\n    6|   pre #{error.stack}\n    7| \n\nCannot read property \'status\' of undefined</h1><h2></h2><pre></pre></body></html>');
          done();
        });
      });
    });
  });
});