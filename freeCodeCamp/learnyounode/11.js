let http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    res.writeHead(200, 'content-type: text/plain');
    let fileStream = fs.createReadStream(process.argv[3]);
    fileStream.pipe(res);
});

server.listen(+process.argv[2]);
