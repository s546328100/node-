const net = require('net');
const readline = require('readline');

console.log('type "exit" or "quit" to quit.');

let sock = net.connect({port: 8124}, () => {
    console.log('server connected');
    sock.setEncoding('utf8');
    sock.write('Hello Echo Server\r\n');
});

sock.on('data', function(data) {
    console.log('got data from server - ', data);
});

sock.on('end', function() {
    console.log('client disconnected');
});

sock.on('error', function(err) {
    console.log('socket error - ', err);
});

sock.on('close', function() {
    console.log('echo client was closed');
    process.exit(0);
});

let rl = readline.createInterface({
    input: process.stdin
});

function quitEcho() {
    rl.close();
    sock.end();
    console.log('quit echo client');
}

rl.on('line', cmd => {
    if (cmd.indexOf('quit') == 0 || cmd.indexOf('exit') == 0) {
        quitEcho();
    } else {
        sock.write(cmd + '\r\n');
    }
});

rl.on('SIGINT', quitEcho);