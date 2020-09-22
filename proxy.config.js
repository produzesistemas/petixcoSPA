const proxy = [
    {
      context: '/api',
      target: 'http://localhost:51296',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;