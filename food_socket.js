const io = require('socket.io-client');

const socket = io('http://localhost:7001/push', {query: {token: 'JDJhJDEwJDZ5d1Nib2xvY0xwTW5lU0oyaGVwUk9OV2U1cmdRb0ZpVW9VZktHNHNHdXA1RDh0QUZ6ZGYuMTUzODk3MDQ1NDEzMg=='}});
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
