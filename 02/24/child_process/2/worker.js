const net = require('net');
//监听master发送过来的信息
process.on('message', function(m, handle) {
    start(handle);
});

var buf = 'hello nodejs'; ///返回信息
var res = ['HTTP/1.1 200 OK', 'content-length:' + buf.length].join('\r\n') + '\r\n\r\n' + buf; //嵌套字

function start(server) {
    server.listen();
    var num = 0;
    //监听connection函数
    server.onconnection = function(err, handle) {
        num++;
        console.log(`worker[${process.pid}]:${num}`);
        var socket = new net.Socket({
            handle: handle
        });
        socket.readable = socket.writable = true;
        socket.end(res);
    };
}
