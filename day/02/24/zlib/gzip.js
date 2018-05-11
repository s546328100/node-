const fs = require('fs');
const zlib = require('zlib');

let gzib = zlib.createGzip();

let inFile = fs.createReadStream('data.txt');
let out = fs.createWriteStream('data.txt.gz');

inFile.pipe(gzib).pipe(out);
