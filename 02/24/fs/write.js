// 如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；
const fs = require('fs');

// 同步写入
// try {
//     fs.writeFileSync('data.txt', 'hello word', 'utf8');
//     console.log('文件写入成功');
// } catch (err) {
//     throw err;
// }

// 异步写入
// fs.writeFile('data.txt', 'hello word 1', 'utf8', err => {
//     if (err) throw err;
//     console.log('文件写入成功');
// });

// 流写入
let writeStream = fs.createWriteStream('data.txt', 'utf8');

writeStream.on('close', () => {
    console.log('已经关闭');
});

writeStream.write('hello ');
writeStream.write('world ');
writeStream.end('3');
