module.exports = {
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
