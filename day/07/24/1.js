function isJSON(str, pass_object) {
    if (pass_object && isObject(str)) return true;

    if (!isString(str)) return false;

    str = str.replace(/\s/g, '').replace(/\n|\r/, '');

    if (/^\{(.*?)\}$/.test(str)) return /"(.*?)":(.*?)/g.test(str);

    if (/^\[(.*?)\]$/.test(str)) {
        return str
            .replace(/^\[/, '')
            .replace(/\]$/, '')
            .replace(/},{/g, '}\n{')
            .split(/\n/)
            .map(function(s) {
                return isJSON(s);
            })
            .reduce(function(prev, curr) {
                return !!curr;
            });
    }

    return false;
}

function strict(str) {
    if (isObject(str)) {
        return true;
    }

    try {
        return JSON.parse(str) && true;
    } catch (ex) {
        return false;
    }
}

function isString(x) {
    return Object.prototype.toString.call(x) === '[object String]';
}

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

var good_json = '{"a":"obja","b":[0,1,2],"c":{"d":"some object"}}';
var bad_json = '{"a":"obja""b":[0,1,2],"c":{"d":"some object"}}';
var str_number = '121212';


console.log(isJSON(good_json)); // true
console.log(isJSON(bad_json)); // false
console.log(isJSON(str_number)); // false