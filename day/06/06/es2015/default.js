function f(a, b) {
    var args = Array.prototype.slice.call(arguments, f.length);
    console.log(args);
    // …
  }

f(1,2,3)