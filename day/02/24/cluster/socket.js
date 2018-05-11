const cluster = require('cluster');
const net = require('net');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log('[master] ' + 'start master...');

    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('listening', function(worker, address) {
        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ':' + address.port);
    });
} else if (cluster.isWorker) {
    //自动创建socket
    const server = net.createServer(function(socket) {
        //'connection' listener
        socket.on('end', function() {
            console.log('server disconnected');
        });
        socket.on('data', function() {
            socket.end('hello\r\n');
        });
    });
    //开启端口的监听
    server.listen(8124, function() {
        //'listening' listener
        console.log('working');
    });
}
