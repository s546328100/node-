const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    let _url = url.parse(req.url, true);
    let pathname = _url.pathname;
    let iso = _url.query.iso;
    let time = new Date(iso);

    if (pathname === '/api/parsetime') {
        let hour = time.getHours();
        let minute = time.getMinutes();
        let second = time.getSeconds();
        res.end(JSON.stringify({hour, minute, second}));
    }

    if (pathname === '/api/unixtime') {
        res.end(JSON.stringify({unixtime: time.getTime()}));
    }
}).listen(+process.argv[2]);
