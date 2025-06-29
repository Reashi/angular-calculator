const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://s1.divlop.com:5001',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  }
];

module.exports = PROXY_CONFIG; 