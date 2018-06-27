function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
}

var MAX_SAFE_INTEGER = 9007199254740991;

function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
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

function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
}

var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function('return this')();
var Symbol$1 = root.Symbol;
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

var objectProto = Object.prototype;
var nativeObjectToString = objectProto.toString;
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

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

module.exports = isArrayLike;