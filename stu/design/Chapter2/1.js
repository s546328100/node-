const fs = require('fs');
const cache = {};

function inconsistentRead(filename, callback) {
    if (cache[filename]) {
        // 如果缓存命中，则同步执行回调
        // callback(cache[filename]);
        process.nextTick(() => callback(cache[filename]));
    } else {
        // 未命中，则执行异步非阻塞的I/O操作
        fs.readFile(filename, 'utf8', (err, data) => {
            cache[filename] = data;
            callback(data);
        });
    }
}

function createFileReader(filename) {
    const listeners = [];
    inconsistentRead(filename, value => {
        listeners.forEach(listener => listener(value));
    });
    return {
        onDataReady: listener => listeners.push(listener)
    };
}

const reader1 = createFileReader('stu/design/Chapter2/data.txt');
reader1.onDataReady(data => {
    console.log('First call data: ' + data);
    // 之后再次通过fs读取同一个文件
    const reader2 = createFileReader('stu/design/Chapter2/data.txt');
    reader2.onDataReady(data => {
        console.log('Second call data: ' + data);
    });
});
