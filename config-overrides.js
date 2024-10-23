module.exports = function override(config, env) {
  config.output.filename = `static/js/widget.js`;

  const miniCssExtractPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin',
  );
  if (miniCssExtractPlugin) {
    miniCssExtractPlugin.options.filename = `static/css/widget.css`;
  }

  return config;
};
