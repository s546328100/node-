const fs = require('fs');

// 1.文件是否存在
// 不建议在调用 fs.open() 、 fs.readFile() 或 fs.writeFile() 之前使用 fs.access() 检查一个文件的可访问性。
// fs.access('data.txt', err => {
//     if (err) console.log(err);
//     console.log('文件已存在');
// });

// (推荐)
fs.open('data.txt', 'wx', (err, fd) => {
    if (err) {
        if (err.code === 'EEXIST') {
            console.error('文件已存在');
            return;
        }

        throw err;
    }
});
