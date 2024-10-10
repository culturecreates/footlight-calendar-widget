/* eslint-disable no-undef */
const { version } = require('./package.json');
module.exports = function override(config, env) {
  if (env === 'production') {
    config.output.filename = `static/js/widget-${version}.js`;
    config.plugins[5].options.filename = `static/css/widget-${version}.css`;
  }
  return config;
};
