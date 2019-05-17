// set up cors-anywhere proxy:
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var PORT = process.env.PORT || 8080;
var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(PORT, host, function () {
    console.log('Running CORS Anywhere on ' + host + ':' + PORT);
});