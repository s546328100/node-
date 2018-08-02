function asyncDivision(dividend, divisor, cb) {
    return new Promise((resolve, reject) => {
        // [1]
        process.nextTick(() => {
            const result = dividend / divisor;
            if (isNaN(result) || !Number.isFinite(result)) {
                const error = new Error('Invalid operands');
                if (cb) {
                    cb(error); // [2]
                }
                return reject(error);
            }
            if (cb) {
                cb(null, result); // [3]
            }
            resolve(result);
        });
    });
}

// 回调函数的方式
asyncDivision(10, 2, (error, result) => {
    if (error) {
        return console.error(error);
    }
    console.log(result);
});

// Promise化的调用方式
asyncDivision(22, 11)
    .then(result => console.log(result))
    .catch(error => console.error(error));
