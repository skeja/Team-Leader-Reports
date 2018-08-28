const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  configureWebpack(config, context) {
    if (context.command !== 'build') return;
    config.plugins.push(new BundleAnalyzerPlugin());
  },
  entry: 'client/main.js',
  html: {
    title: 'Team Leader Reports',
    favicon: 'client/assets/favicon.ico'
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};
