let EventEmitter = require('./eventEmitter.js');

let emitter = new EventEmitter();


emitter.on('abc', function test () {
    console.log(123);
    emitter.on('abc', test);
});


emitter.emit('abc');
emitter.emit('abc');


