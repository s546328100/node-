var eachOfSeries = doLimit(eachOfLimit, 1);

function series(tasks, callback) {
    _parallel(eachOfSeries, tasks, callback);
}

function doLimit(fn, limit) {
    return function(iterable, iteratee, callback) {
        return fn(iterable, limit, iteratee, callback);
    };
}

function eachOfLimit(coll, limit, iteratee, callback) {
    _eachOfLimit(limit)(coll, wrapAsync(iteratee), callback);
}

var supportsSymbol = typeof Symbol === 'function';

function isAsync(fn) {
    return supportsSymbol && fn[Symbol.toStringTag] === 'AsyncFunction';
}

function wrapAsync(asyncFn) {
    return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
}

function slice(arrayLike, start) {
    start = start | 0;
    var newLen = Math.max(arrayLike.length - start, 0);
    var newArr = Array(newLen);
    for (var idx = 0; idx < newLen; idx++) {
        newArr[idx] = arrayLike[start + idx];
    }
    return newArr;
}

var initialParams = function(fn) {
    return function(/*...args, callback*/) {
        var args = slice(arguments);
        var callback = args.pop();
        fn.call(this, args, callback);
    };
};

function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
}

function asyncify(func) {
    return initialParams(function(args, callback) {
        var result;
        try {
            result = func.apply(this, args);
        } catch (e) {
            return callback(e);
        }
        // if result is Promise object
        if (isObject(result) && typeof result.then === 'function') {
            result.then(
                function(value) {
                    invokeCallback(callback, null, value);
                },
                function(err) {
                    invokeCallback(callback, err.message ? err : new Error(err));
                }
            );
        } else {
            callback(null, result);
        }
    });
}

function invokeCallback(callback, error, value) {
    try {
        callback(error, value);
    } catch (e) {
        setImmediate$1(rethrow, e);
    }
}

function rethrow(error) {
    throw error;
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

var hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
var hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';

function fallback(fn) {
    setTimeout(fn, 0);
}

if (hasSetImmediate) {
    _defer = setImmediate;
} else if (hasNextTick) {
    _defer = process.nextTick;
} else {
    _defer = fallback;
}

var setImmediate$1 = wrap(_defer);

function once(fn) {
    return function() {
        if (fn === null) return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}

function noop() {
    // No operation performed.
}

var MAX_SAFE_INTEGER = 9007199254740991;

function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

var Symbol$1 = root.Symbol;

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

var objectProto = Object.prototype;

var nativeObjectToString = objectProto.toString;

function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag$1),
        tag = value[symToStringTag$1];

    try {
        value[symToStringTag$1] = undefined;
        var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    if (unmasked) {
        if (isOwn) {
            value[symToStringTag$1] = tag;
        } else {
            delete value[symToStringTag$1];
        }
    }
    return result;
}

var objectProto$1 = Object.prototype;

var nativeObjectToString$1 = objectProto$1.toString;

function objectToString(value) {
    return nativeObjectToString$1.call(value);
}

function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

var asyncTag = '[object AsyncFunction]';
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var proxyTag = '[object Proxy]';

function isFunction(value) {
    if (!isObject(value)) {
        return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
}

function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value),
        isArg = !isArr && isArguments(value),
        isBuff = !isArr && !isArg && isBuffer(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
        if (
            (inherited || hasOwnProperty$1.call(value, key)) &&
            !(
                skipIndexes &&
                // Safari 9 has enumerable `arguments.length` in strict mode.
                (key == 'length' ||
                    // Node.js 0.10 has enumerable non-index properties on buffers.
                    (isBuff && (key == 'offset' || key == 'parent')) ||
                    // PhantomJS 2 has enumerable non-index properties on typed arrays.
                    (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
                    // Skip index properties.
                    isIndex(key, length))
            )
        ) {
            result.push(key);
        }
    }
    return result;
}

function baseKeys(object) {
    if (!isPrototype(object)) {
        return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
        if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
            result.push(key);
        }
    }
    return result;
}

function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

function createArrayIterator(coll) {
    var i = -1;
    var len = coll.length;
    return function next() {
        return ++i < len ? {value: coll[i], key: i} : null;
    };
}

function createES2015Iterator(iterator) {
    var i = -1;
    return function next() {
        var item = iterator.next();
        if (item.done) return null;
        i++;
        return {value: item.value, key: i};
    };
}

function createObjectIterator(obj) {
    var okeys = keys(obj);
    var i = -1;
    var len = okeys.length;
    return function next() {
        var key = okeys[++i];
        return i < len ? {value: obj[key], key: key} : null;
    };
}

var iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator;

var getIterator = function(coll) {
    return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
};

function iterator(coll) {
    if (isArrayLike(coll)) {
        return createArrayIterator(coll);
    }

    var iterator = getIterator(coll);
    return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
}

var breakLoop = {};

function onlyOnce(fn) {
    return function() {
        if (fn === null) throw new Error('Callback was already called.');
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
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

exports.series = series;
