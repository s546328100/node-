const isArrayLike = require('../isArrayLike');

function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

var objectProto$5 = Object.prototype;

function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

    return value === proto;
}

function overArg(func, transform) {
    return function(arg) {
        return func(transform(arg));
    };
}

var nativeKeys = overArg(Object.keys, Object);

var objectProto$4 = Object.prototype;

var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

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

var isArray = Array.isArray;

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

module.exports = iterator;
