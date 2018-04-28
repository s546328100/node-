const fs = require('fs');

fs.open('04/18/info.txt', 'r', (err, handle) => {
    if (err) {
        console.log(err);
        return;
    }
    let buf = new Buffer(100000);
    fs.read(handle, buf, 0, 100000, null, (err, length) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(buf.toString('utf8', 0, length));
        fs.close(handle, () => {
            console.log('close');
        });
    });
});
