var _ = require('lodash');
var heroin = require('heroin-js');

var baseConfig = require('./base');

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

var testSpecific = {
  name: 'node-workshop-wn-test',
  domains: ['node-workshop-wn-test.herokuapp.com'],
  config_vars: {
    'NODE_ENV': 'test'
  }
};

var testConfig = _.defaults({}, testSpecific, baseConfig);

configurator(testConfig);