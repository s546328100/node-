const io = require('socket.io-client');

const socket = io('http://localhost:7001/push', {query: {token: 'JDJhJDEwJGIvSDVLV1V3SlRtU3puMlVibEtBcU82MEc3Z3hsZzdwNDFRYkJmYW8xZ3BPQ2ozaEcvdDhpMTUzOTI0OTU0OTQyNw=='}});
socket.on('connect', function() {
  console.log(socket.id);
  console.log('123');
  // socket.emit('server', {rp: 'fine,thank you'});
  socket.on('table_current_status', data => {
    console.log(data);
  });

  socket.on(socket.id, function(data) {
    console.log(data);
  });

  socket.on('errMsg', function(data) {
    console.log(data);
  });
});


socket.on('disconnecting', () => {
  console.log('#disconnecting');
});

socket.on('disconnect', () => {
  console.log('#disconnect');
});

socket.on('error', () => {
  console.log('#error');
});

socket.on('res', function(data) {
  socket.emit('msg', {rp: 'fine,thank you'}); //向服务器发送消息
  console.log(data);
});
