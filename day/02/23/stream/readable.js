let Readable = require('stream').Readable;
let rs = Readable();

// rs.push('123 ');
// rs.push('abc\n');
// rs.push(null);

let c = 97;
rs._read = function() {
    rs.push(String.fromCharCode(c++));
    if (c > 'z'.charCodeAt(0)) rs.push(null);
};

rs.pipe(process.stdout);
