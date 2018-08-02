const http = require('http');
let map = require('through2-map');

http.createServer((req, res) => {
    if (req.method !== 'POST') res.end('NO POST!!');
    // req.pipe(
    //     map(chunk => {
    //         return chunk.toString().toUpperCase();
    //     })
    // ).pipe(res);
    let str = '';
    req.on('data', data => {
        str += data.toString();
    });

    req.on('end', () => {
        res.end(str.toUpperCase());
    });
}).listen(+process.argv[2]);
