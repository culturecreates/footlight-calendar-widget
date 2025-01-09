const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function override(config, env) {
  // Customize JS and CSS output filenames
  config.output.filename = `static/js/widget.js`;

  const miniCssExtractPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin',
  );
  if (miniCssExtractPlugin) {
    miniCssExtractPlugin.options.filename = `static/css/widget.css`;
  }

  // to analize bundle run - ANALYZE=true npm run build:production
  if (process.env.ANALYZE === 'true') {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-report.html',
        openAnalyzer: true,
      }),
    );
  }

  return config;
};
