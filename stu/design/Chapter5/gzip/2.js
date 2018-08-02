'use strict';

const fs = require('fs');
const zlib = require('zlib');

const file = '1.txt';

fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(file + '.gz'))
    .on('finish', () => console.log('File successfully compressed'));
