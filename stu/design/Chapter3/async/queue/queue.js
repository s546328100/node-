const wrapAsync = require('../wrapAsync');
const DLL = require('./DLL');

var queue$1 = function(worker, concurrency) {
    var _worker = wrapAsync(worker);
    return queue(
        function(items, cb) {
            _worker(items[0], cb);
        },
        concurrency,
        1
    );
};

function queue(worker, concurrency, payload) {
    if (concurrency == null) {
        concurrency = 1;
    } else if (concurrency === 0) {
        throw new Error('Concurrency must not be zero');
    }

    var _worker = wrapAsync(worker);
    var numRunning = 0;
    var workersList = [];

    var processingScheduled = false;
    function _insert(data, insertAtFront, callback) {
        if (callback != null && typeof callback !== 'function') {
            throw new Error('task callback must be a function');
        }
        q.started = true;
        if (!isArray(data)) {
            data = [data];
        }
        if (data.length === 0 && q.idle()) {
            // call drain immediately if there are no tasks
            return setImmediate$1(function() {
                q.drain();
            });
        }

        for (var i = 0, l = data.length; i < l; i++) {
            var item = {
                data: data[i],
                callback: callback || noop
            };

            if (insertAtFront) {
                q._tasks.unshift(item);
            } else {
                q._tasks.push(item);
            }
        }

        if (!processingScheduled) {
            processingScheduled = true;
            setImmediate$1(function() {
                processingScheduled = false;
                q.process();
            });
        }
    }

    function _next(tasks) {
        return function(err) {
            numRunning -= 1;

            for (var i = 0, l = tasks.length; i < l; i++) {
                var task = tasks[i];

                var index = baseIndexOf(workersList, task, 0);
                if (index === 0) {
                    workersList.shift();
                } else if (index > 0) {
                    workersList.splice(index, 1);
                }

                task.callback.apply(task, arguments);

                if (err != null) {
                    q.error(err, task.data);
                }
            }

            if (numRunning <= q.concurrency - q.buffer) {
                q.unsaturated();
            }

            if (q.idle()) {
                q.drain();
            }
            q.process();
        };
    }

    var isProcessing = false;
    var q = {
        _tasks: new DLL(),
        concurrency: concurrency,
        payload: payload,
        saturated: noop,
        unsaturated: noop,
        buffer: concurrency / 4,
        empty: noop,
        drain: noop,
        error: noop,
        started: false,
        paused: false,
        push: function(data, callback) {
            _insert(data, false, callback);
        },
        kill: function() {
            q.drain = noop;
            q._tasks.empty();
        },
        unshift: function(data, callback) {
            _insert(data, true, callback);
        },
        remove: function(testFn) {
            q._tasks.remove(testFn);
        },
        process: function() {
            // Avoid trying to start too many processing operations. This can occur
            // when callbacks resolve synchronously (#1267).
            if (isProcessing) {
                return;
            }
            isProcessing = true;
            while (!q.paused && numRunning < q.concurrency && q._tasks.length) {
                var tasks = [],
                    data = [];
                var l = q._tasks.length;
                if (q.payload) l = Math.min(l, q.payload);
                for (var i = 0; i < l; i++) {
                    var node = q._tasks.shift();
                    tasks.push(node);
                    workersList.push(node);
                    data.push(node.data);
                }

                numRunning += 1;

                if (q._tasks.length === 0) {
                    q.empty();
                }

                if (numRunning === q.concurrency) {
                    q.saturated();
                }

                var cb = onlyOnce(_next(tasks));
                _worker(data, cb);
            }
            isProcessing = false;
        },
        length: function() {
            return q._tasks.length;
        },
        running: function() {
            return numRunning;
        },
        workersList: function() {
            return workersList;
        },
        idle: function() {
            return q._tasks.length + numRunning === 0;
        },
        pause: function() {
            q.paused = true;
        },
        resume: function() {
            if (q.paused === false) {
                return;
            }
            q.paused = false;
            setImmediate$1(q.process);
        }
    };
    return q;
}

var hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
var hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';

function fallback(fn) {
    setTimeout(fn, 0);
}

function wrap(defer) {
    return function(fn /*, ...args*/) {
        var args = slice(arguments, 1);
        defer(function() {
            fn.apply(null, args);
        });
    };
}

var _defer;

if (hasSetImmediate) {
    _defer = setImmediate;
} else if (hasNextTick) {
    _defer = process.nextTick;
} else {
    _defer = fallback;
}

var setImmediate$1 = wrap(_defer);

function noop() {}

var isArray = Array.isArray;

function slice(arrayLike, start) {
    start = start | 0;
    var newLen = Math.max(arrayLike.length - start, 0);
    var newArr = Array(newLen);
    for (var idx = 0; idx < newLen; idx++) {
        newArr[idx] = arrayLike[start + idx];
    }
    return newArr;
}

function onlyOnce(fn) {
    return function() {
        if (fn === null) throw new Error('Callback was already called.');
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}

function baseIndexOf(array, value, fromIndex) {
    return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
}

function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
        if (array[index] === value) {
            return index;
        }
    }
    return -1;
}

function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
            return index;
        }
    }
    return -1;
}

function baseIsNaN(value) {
    return value !== value;
}

module.exports.queue = queue$1;
