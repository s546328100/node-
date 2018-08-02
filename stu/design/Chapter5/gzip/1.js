'use strict';

const fs = require('fs');
const zlib = require('zlib');

const file = '1.txt';

fs.readFile(file, (err, buffer) => {
    zlib.gzip(buffer, (err, buffer) => {
        fs.writeFile(file + '.gz', buffer, err => {
            console.log('File successfully compressed');
        });
    });
});
