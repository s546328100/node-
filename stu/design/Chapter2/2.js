const fs = require('fs');

function readJSON(filename, callback) {
    fs.readFile(filename, 'utf8', (err, data) => {
        let parsed;
        if (err)
            // 如果有错误产生则退出当前调用
            return callback(err);
        try {
            // 解析文件中的数据
            parsed = JSON.parse(data);
        } catch (err) {
            // 捕获解析中的错误，如果有错误产生，则进行错误处理
            return callback(err);
        }
        // 没有错误，调用回调
        callback(null, parsed);
    });
}

process.on('uncaughtException', err => {
    console.error('This will catch at last the ' + 'JSON parsing exception: ' + err.message);
    // Terminates the application with 1 (error) as exit code:
    // without the following line, the application would continue
    process.exit(1);
});

readJSON('stu/design/Chapter2/data.txt', (err, res) => console.log(err + '  ' + res));
