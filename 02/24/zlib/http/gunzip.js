// 客户端请求示例
const zlib = require('zlib');
const http = require('http');
const fs = require('fs');

const request = http.get({host: 'example.com', path: '/', port: 80, headers: {'Accept-Encoding': 'gzip,deflate'}});

request.on('response', response => {
    const output = fs.createWriteStream('index.html');

    switch (response.headers['content-encoding']) {
    // 或者, 只是使用 zlib.createUnzip() 方法去处理这两种情况
    case 'gzip':
        response.pipe(zlib.createGunzip()).pipe(output);
        break;
    case 'deflate':
        response.pipe(zlib.createInflate()).pipe(output);
        break;
    default:
        response.pipe(output);
        break;
    }
});
