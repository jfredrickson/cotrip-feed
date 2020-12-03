const chai = require('chai');
const nock = require('nock');

const should = chai.should();

const baseUrl = 'https://api.cotrip.org';

describe('Feed', () => {
  it('should require a valid options object', () => {
    (() => {
      const missingOptions = require('../lib/index')();
    }).should.throw(Error);
  });

  it('should require an API key in the options', () => {
    (() => {
      const missingKey = require('../lib/index')({});
    }).should.throw(Error);
  });
});

describe('Alerts', () => {
  let feed;

  beforeEach(() => {
    nock(baseUrl)
      .get('/xml/alerts.xml')
      .query(true)
      .replyWithFile(200, __dirname + '/fixtures/alerts.valid.xml', { 'Content-Type': 'application/xml' });

    feed = require('../lib/index')({ apiKey: 'abcdef' });
  });

  it('should return an array of all alerts', () => {
    return feed.alerts().then(result => result.should.have.lengthOf(397));
  });
});

describe('Road Conditions', () => {
  let feed;

  beforeEach(() => {
    nock(baseUrl)
      .get('/xml/road_conditions.xml')
      .query(true)
      .replyWithFile(200, __dirname + '/fixtures/road_conditions.valid.xml', { 'Content-Type': 'application/xml' });

    feed = require('../lib/index')({ apiKey: 'abcdef' });
  });

  it('should return an array of roads', () => {
    return feed.roadConditions().then(result => result.should.have.lengthOf(173));
  });
});
