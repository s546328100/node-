const map = new Map();

let s = map.set('123323', {id: 1, name: 'xx'});
let g = map.get('123323')

console.log(s);
console.log(g.id);

// new Array(31).fill(new Set())
// No，数组中所有Set集合为同一个

var moment = require('moment');
let day = moment().add(1, 'd').startOf('day'); 
console.log(day);

console.log(moment('2018-10-12').isBefore(day));

console.log(moment().valueOf() + 60 * 1000);

console.log(new Date('1539228829330'));