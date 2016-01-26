var _ = require('lodash');
var heroin = require('heroin-js');

var baseConfig = require('./base');

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

var prodSpecific = {
  name: 'node-workshop-wn',
  domains: ['node-workshop-wn.herokuapp.com'],
  config_vars: {
    'NODE_ENV': 'production'
  }
};

var prodConfig = _.defaults({}, prodSpecific, baseConfig);

configurator(prodConfig);