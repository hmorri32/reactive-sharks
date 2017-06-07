/* eslint-env node, mocha */

process.env.NODE_ENV = 'test';
const chai           = require('chai');
const expect         = chai.expect;
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
    it('should render HTML error for bogus route', () => {
      chai.request(server)
      .get('/ultrasweetroute')
      .end((error, response) => {
        response.should.have.status(404);
        response.text.should.include('no such file');
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
          response.should.have.status(404);
          response.should.be.html;
          response.text.should.include('Error');
          done();
        });
      });
    });
  });
});