const t = require('./index');
const mapobj = require('map-obj');

let clg = t({a: 1, b: 2}, (k, v) => k + v);

console.log(clg);

const obj = {one: 1, obj: {two: 2, three: 3}, arr: [{four: 4}, 5]};
const fn = (key, val) => [key, typeof val === 'number' ? val * 2 : val];
let s = mapobj(obj, fn, {deep: true});
console.log(s);
