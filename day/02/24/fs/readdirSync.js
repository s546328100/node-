const fs = require('fs');
const path = require('path');

// 遍历目录
// fs.readdirSync()只会读一层，所以需要判断文件类型是否目录，如果是，则进行递归遍历。
let getFilesInDir = function(dir) {
    let results = [path.resolve(dir)];
    let files = fs.readdirSync(dir, 'utf8');

    files.forEach(file => {
        file = path.resolve(dir, file);
        let stats = fs.statSync(file);
        if (stats.isFile()) results.push(file);
        else if (stats.isDirectory()) results = results.concat(getFilesInDir(file));
    });

    return results;
};

let files = getFilesInDir('../');
console.log(files);
