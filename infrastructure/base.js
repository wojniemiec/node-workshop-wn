var baseConfig = {
  region: 'eu',
  maintenance: false,
  stack: 'cedar-14',
  config_vars: {},
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
  log_drains: []
};

module.exports = baseConfig;