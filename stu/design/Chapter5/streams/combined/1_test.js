'use strict';

const fs = require('fs');
const compressAndEncryptStream = require('./1').compressAndEncrypt;

fs.createReadStream(process.argv[3])
    .pipe(compressAndEncryptStream(process.argv[2]))
    .pipe(fs.createWriteStream(process.argv[3] + '.gz.enc'))
    .on('error', err => {
        //Only errors from the last stream
        console.log('---', err);
    });
