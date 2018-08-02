const thunkify = require('thunkify');
const co = require('co');

let tasks = [
    function*() {
        console.log(112);
        yield Promise.resolve(console.log(111));
        console.log(113);
    },
    function*() {
        console.log(223);
        yield Promise.resolve(console.log(222));
        console.log(224);
    },
    function*() {
        console.log(334);
        yield Promise.resolve(console.log(333));
        console.log(335);
    }
];

co(function*() {
    try {
        yield tasks;
        console.log('Download complete');
    } catch (err) {
        console.log(err);
    }
});


