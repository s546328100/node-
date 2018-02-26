// 服务端示例
// 对每一个请求运行 gzip 操作的成本是十分高昂的.
// 缓存压缩缓冲区是更加高效的方式.
const zlib = require('zlib');
const http = require('http');
const fs = require('fs');

http
    .createServer((request, response) => {
        const raw = fs.createReadStream('index.html');
        let acceptEncoding = request.headers['accept-encoding'];
        if (!acceptEncoding) acceptEncoding = '';

        if (/\bdeflate\b/.test(acceptEncoding)) {
            response.writeHead(200, {'Content-Encoding': 'deflate'});
            raw.pipe(zlib.createDeflate()).pipe(response);
        } else if (/\bgzip\b/.test(acceptEncoding)) {
            response.writeHead(200, {'Content-Encoding': 'gzip'});
            raw.pipe(zlib.createGzip()).pipe(response);
        } else {
            response.writeHead(200, {});
            raw.pipe(response);
        }
    })
    .listen(3000);
