const isArrayLike = require('../isArrayLike');
const wrapAsync = require('../wrapAsync');
const iterator = require('../iterator');

var eachOfSeries = doLimit(eachOfLimit, 1);

function eachOfLimit(coll, limit, iteratee, callback) {
    _eachOfLimit(limit)(coll, wrapAsync(iteratee), callback);
}

function doLimit(fn, limit) {
    return function(iterable, iteratee, callback) {
        return fn(iterable, limit, iteratee, callback);
    };
}

function once(fn) {
    return function() {
        if (fn === null) return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}

function onlyOnce(fn) {
    return function() {
        if (fn === null) throw new Error('Callback was already called.');
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}

var breakLoop = {};

function _eachOfLimit(limit) {
    return function(obj, iteratee, callback) {
        callback = once(callback || noop);
        if (limit <= 0 || !obj) {
            return callback(null);
        }
        var nextElem = iterator(obj);
        var done = false;
        var running = 0;
        var looping = false;

        function iterateeCallback(err, value) {
            running -= 1;
            if (err) {
                done = true;
                callback(err);
            } else if (value === breakLoop || (done && running <= 0)) {
                done = true;
                return callback(null);
            } else if (!looping) {
                replenish();
            }
        }

        function replenish() {
            looping = true;
            while (running < limit && !done) {
                var elem = nextElem();
                if (elem === null) {
                    done = true;
                    if (running <= 0) {
                        callback(null);
                    }
                    return;
                }
                running += 1;
                iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
            }
            looping = false;
        }

        replenish();
    };
}

function series(tasks, callback) {
    _parallel(eachOfSeries, tasks, callback);
}

function _parallel(eachfn, tasks, callback) {
    callback = callback || noop;
    var results = isArrayLike(tasks) ? [] : {};

    eachfn(
        tasks,
        function(task, key, callback) {
            wrapAsync(task)(function(err, result) {
                if (arguments.length > 2) {
                    result = slice(arguments, 1);
                }
                results[key] = result;
                callback(err);
            });
        },
        function(err) {
            callback(err, results);
        }
    );
}

function noop() {
    // No operation performed.
}

module.exports = series;
