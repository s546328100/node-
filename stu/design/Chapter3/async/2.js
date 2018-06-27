function once(fn) {
    return function() {
        if (fn === null) return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}

function c () {
    console.log(123);
}

let s = once(c);
s()
s()