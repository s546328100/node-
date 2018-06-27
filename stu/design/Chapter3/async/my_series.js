function series(tasks, callback) {
    _parallel(eachOfSeries, tasks, callback);
}

function noop() {}

function _parallel(eachfn, tasks, callback) {
    callback = callback || noop;
    var results = [];

    eachfn(
        tasks,
        function(task, key, callback) {
            task(function(err, result) {
                results[key] = result;
                callback(err);
            });
        },
        function(err) {
            callback(err, results);
        }
    );
}

var eachOfSeries = function(iterable, iteratee, callback) {
    return _eachOfLimit(1)(iterable, iteratee, callback);
};

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

function createArrayIterator(coll) {
    var i = -1;
    var len = coll.length;
    return function next() {
        return ++i < len ? {value: coll[i], key: i} : null;
    };
}

function _eachOfLimit(limit) {
    return function(obj, iteratee, callback) {
        callback = once(callback || noop);
        if (limit <= 0 || !obj) {
            return callback(null);
        }
        var nextElem = createArrayIterator(obj);
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

module.exports = series;
