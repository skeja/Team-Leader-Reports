module.exports = {
  entry: 'client/main.js',
  html: {
    title: 'Team Leader Reports'
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};
