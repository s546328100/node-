'use strict';

const ReplaceStream = require('./1');
process.stdin.pipe(new ReplaceStream(process.argv[2], process.argv[3])).pipe(process.stdout);
