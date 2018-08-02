'use strict';

const ReplaceStream = require('./1');

const rs = new ReplaceStream('World', 'Node.js');
rs.on('data', chunk => console.log(chunk.toString()));

rs.write('Hello Worl');
rs.write('d! hahahh World');
rs.end();
