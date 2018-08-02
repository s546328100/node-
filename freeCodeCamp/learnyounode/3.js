const fs = require('fs');

let buff = fs.readFileSync('program.js');

let str = buff.toString();

let arr = str.split('\n');

console.log(arr.length);