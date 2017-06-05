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
  })
})