const t = require('./index');

let clg = t([{a: 1, b: 2}, {a: 2, b: 3}, {a: 1, b:2}], v => v.a);

console.log(clg);
