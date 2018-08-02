const wrapAsync = require('../wrapAsync');
const isArrayLike = require('../isArrayLike');

/**
 * @param {Array|Iterable|Object} coll - 迭代的集合。
 * @param {AsyncFunction} iteratee - 一个异步函数，用于应用于coll中的每个项目。用（item，callback）调用。数组索引不会传递给iteratee。如果需要索引，请使用eachOf。
 * @param {Function} [callback] - 所有iteratee函数完成或发生错误时调用的回调。用（错误）调用。
 *
 * 调用eachOf函数。
 * warpAsync()包装成异步：如iteratee为AsyncFunction进行包装，否则返回原函数。
 * _withoutIndex()返回一个闭包函数。
 */
function eachLimit(coll, iteratee, callback) {
    eachOf(coll, _withoutIndex(wrapAsync(iteratee)), callback);
}

/**
 * isArrayLike是否为数值
 */
var eachOf = function(coll, iteratee, callback) {
    var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
    eachOfImplementation(coll, wrapAsync(iteratee), callback);
};

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
        var nextElem = createObjectIterator(obj);
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

function noop() {}

function createObjectIterator(obj) {
    var okeys = keys(obj);
    var i = -1;
    var len = okeys.length;
    return function next() {
        var key = okeys[++i];
        return i < len ? {value: obj[key], key: key} : null;
    };
}

function keys(object) {
    var result = [];
    for (var key in Object(object)) {
        result.push(key);
    }
    return result;
}

/**
 * 函数只调用一次
 * 再次调用返回null
 */
function once(fn) {
    return function() {
        if (fn === null) return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}

/**
 * 函数只调用一次
 */
function onlyOnce(fn) {
    return function() {
        if (fn === null) throw new Error('Callback was already called.');
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}

/**
 * _withoutIndex()返回一个闭包函数
 * _withoutIndex()()调用iteratee函数
 */
function _withoutIndex(iteratee) {
    return function(value, index, callback) {
        return iteratee(value, callback);
    };
}

module.exports.each = eachLimit;
