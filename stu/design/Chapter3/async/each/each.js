const wrapAsync = require('../wrapAsync');
const isArrayLike = require('../isArrayLike');
const iterator = require('../iterator');

function eachLimit(coll, iteratee, callback) {
    eachOf(coll, _withoutIndex(wrapAsync(iteratee)), callback);
}

var eachOf = function(coll, iteratee, callback) {
    var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
    eachOfImplementation(coll, wrapAsync(iteratee), callback);
};

var eachOfGeneric = doLimit(eachOfLimit, Infinity);

function doLimit(fn, limit) {
    return function(iterable, iteratee, callback) {
        return fn(iterable, limit, iteratee, callback);
    };
}

function eachOfLimit(coll, limit, iteratee, callback) {
    _eachOfLimit(limit)(coll, wrapAsync(iteratee), callback);
}

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
            } else if (value === {} || (done && running <= 0)) {
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

function eachOfArrayLike(coll, iteratee, callback) {
    callback = once(callback || noop);
    var index = 0,
        completed = 0,
        length = coll.length;
    if (length === 0) {
        callback(null);
    }

    function iteratorCallback(err, value) {
        if (err) {
            callback(err);
        } else if (++completed === length || value === {}) {
            callback(null);
        }
    }

    for (; index < length; index++) {
        iteratee(coll[index], index, onlyOnce(iteratorCallback));
    }
}

function noop() {}

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

function _withoutIndex(iteratee) {
    return function(value, index, callback) {
        return iteratee(value, callback);
    };
}

module.exports.each = eachLimit;
