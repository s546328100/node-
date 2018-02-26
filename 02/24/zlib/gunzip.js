const fs = require('fs');
const zlib = require('zlib');

let gunzip = zlib.createGunzip();

let inFile = fs.createReadStream('data.txt.gz');
let outFile = fs.createWriteStream('data.txt');

inFile.pipe(gunzip).pipe(outFile);
