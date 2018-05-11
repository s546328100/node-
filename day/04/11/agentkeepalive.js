const http = require('http');
const Agent = require('agentkeepalive');

const keepaliveAgent = new Agent({
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 60000,
    freeSocketKeepAliveTimeout: 30000 // free socket keepalive for 30 seconds
});

const options = {
    host: 'cnodejs.org',
    port: 80,
    path: '/',
    method: 'GET',
    agent: keepaliveAgent
};

const req = http.request(options, res => {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        console.log('BODY: ');
    });
});
req.on('error', e => {
    console.log('problem with request: ' + e.message);
});
req.end();

setTimeout(() => {
    if (keepaliveAgent.statusChanged) {
      console.log('[%s] agent status changed: %j', Date(), keepaliveAgent.getCurrentStatus());
    }
  }, 2000);
