const Promise = require('./2');

new Promise(resolve => resolve(100)).then(v => console.log(v));
