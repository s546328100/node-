const net = require('net');

let server = net.createServer();

server.on('connection', sock => {
    console.log('client connected, address -  ', sock.remoteAddress, ' port - ', sock.remotePort);

    sock.setEncoding('utf-8');

    sock.on('data', data => {
        console.log('got data from client - ', data);
        sock.write(data);
    });

    sock.on('end', function() {
        console.log('client disconnected');
    });

    sock.on('error', function(err) {
        console.log('socket error - ', err);
    });
});

// maxConnections可以设置服务器的并发连接数上限
server.maxConnections = 10;

server.listen(8124, () => {
    console.log('echo server bound at port - 8124');
});
