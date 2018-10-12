var Decimal = require('decimal.js');

let d = 0

d = d + new Decimal(0.2).sub('0.1').toNumber();

console.log(d);

console.log(0.2+0.1);