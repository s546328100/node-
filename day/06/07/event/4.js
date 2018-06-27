let EventEmitter = require('./3.js');

let emitter = new EventEmitter();

emitter.on('abc', function test() {
    console.log(123);
});
let test = function() {
    console.log(777);
};
emitter.prependListener('abc', test);

emitter.emit('abc');
emitter.removeListener('abc', test);
emitter.emit('abc');

emitter.once(123, function t() {
    console.log('0001');
})

emitter.emit(123);
emitter.emit(123);
