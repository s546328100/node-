const crypto = require('crypto');

let str = '异步编程';
let md5 = crypto.createHash('md5');
md5.update(str, 'utf8');

console.log(md5.digest('hex'));
