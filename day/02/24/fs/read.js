const fs = require('fs');

// 同步读取
// let data;

// try {
//     data = fs.readFileSync('data.txt', 'utf-8');
//     console.log('文件内容：' + data);
// } catch (err) {
//     console.error('读取文件出错: ' + err.message);
// }

// 异步读取
// fs.readFile('data.txt', 'utf8', function(err, data) {
//     if (err) {
//         return console.error('读取文件出错: ' + err.message);
//     }
//     console.log('文件内容: ' + data);
// });

// 流读取 适合大文件
let readStream = fs.createReadStream('data.txt');

readStream
    .on('data', function(chunk) {
        console.log('读取数据: ' + chunk);
    })
    .on('error', function(err) {
        console.log('出错: ' + err.message);
    })
    .on('end', function() {
        // 没有数据了
        console.log('没有数据了');
    })
    .on('close', function() {
        // 已经关闭，不会再有事件抛出
        console.log('已经关闭');
    });
