const net = require('net');
const fork = require('child_process').fork;

var workers = [];
for (var i = 0; i < 4; i++) {
    workers.push(fork('./worker'));
}

var handle = net._createServerHandle('0.0.0.0', 3000);
handle.listen();
//将监听事件移到master中
handle.onconnection = function(err, handle) {
    var worker = workers.pop(); //取出一个pop
    worker.send({}, handle);
    workers.unshift(worker); //再放回取出的pop
};
