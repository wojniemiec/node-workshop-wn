var heroin = require('heroin-js');

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

configurator.export('node-workshop-wn').then(function (result) {
  console.log(result);

  result.name = 'node-workshop-wn-test';
  result.domains = ['node-workshop-wn-test.herokuapp.com'];

  var test = {
    name: 'node-workshop-wn-test',
    region: 'eu',
    maintenance: false,
    stack: 'cedar-14',
    config_vars: {
    },
    addons: {mongolab: {plan: 'mongolab:sandbox'}},
    collaborators: ['woj.niemiec@gmail.com',
      'mateusz.buczek@plan3.se',
      'przemyslaw.kuliga@schibsted.pl'],
    features: {
      'runtime-dyno-metadata': {enabled: false},
      'log-runtime-metrics': {enabled: false},
      'http-session-affinity': {enabled: false},
      preboot: {enabled: false},
      'http-shard-header': {enabled: false},
      'http-end-to-end-continue': {enabled: false}
    },
    formation: [{process: 'web', quantity: 1, size: 'Free'}],
    log_drains: [],
    domains: ['node-workshop-wn-test.herokuapp.com']
  };

  configurator(test);
});