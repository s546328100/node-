const childProcess = require('child_process');
const worker = childProcess.fork('worker.js');

worker.on('message', function(mes) {
    console.log(`from worder, message: ${mes}`);
});
worker.send('this is master');
