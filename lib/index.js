const axios = require('axios');
const xml2js = require('xml2js');

module.exports = function (options) {
  // Check for config object
  if (typeof options !== 'object') {
    throw Error('config must be an object')
  }

  // Check for required API key
  if (typeof options.apiKey !== 'string') {
    throw Error('apiKey is required and must be a string')
  }

  // Options for xml2js
  parseOptions = {
    tagNameProcessors: [
      xml2js.processors.stripPrefix,
      xml2js.processors.firstCharLowerCase
    ],
    valueProcessors: [
      xml2js.processors.parseBooleans
    ],
    explicitArray: false
  };

  const feeds = axios.create({
    baseURL: options.baseUrl || 'https://api.cotrip.org'
  });

  function getData(endpoint) {
    return feeds.get(endpoint, { params: { apiKey: options.apiKey } })
      .then(res => xml2js.parseStringPromise(res.data, parseOptions))
      .catch(err => {
        return Promise.reject(err);
      })
  }

  function alerts() {
    return getData('/xml/alerts.xml').then(data => data.alerts.alert);
  }

  function roadConditions() {
    return getData('/xml/road_conditions.xml').then(data => data.roadConditionsDetails.weatherRoute);
  }

  return {
    alerts,
    roadConditions
  };
};
