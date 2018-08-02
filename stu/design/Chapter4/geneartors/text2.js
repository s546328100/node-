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

let task = callback => {
    let completed = 0,
        hasErrors = false;

    function done(err, result) {
        if (err && !hasErrors) {
            hasErrors = true;
            return callback(err);
        }
        if (++completed === tasks.length && !hasErrors) {
            callback();
        }
    }

    for (let i = 0; i < tasks.length; i++) {
        co(tasks[i]()).then(done);
    }
};

co(function*() {
    try {
        yield task;
        console.log('Download complete');
    } catch (err) {
        console.log(err);
    }
});