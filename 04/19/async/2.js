const fs = require('fs');

function load_list(callback) {
    fs.readdir('03', (err, files) => {
        if (err) {
            callback(err);
            return;
        }

        let only_dirs = [];
        (function iterator(index) {
            if (index === files.length) {
                callback(null, only_dirs);
                return;
            }
            fs.stat('03/' + files[index], (err, stats) => {
                if (err) {
                    callback(err);
                    return;
                }
                if (stats.isDirectory()) only_dirs.push(files[index]);
                iterator(index + 1);
            });
        })(0);
    });
}

load_list((err, albums) => {
    if (err) console.log(err);
    else console.log(albums);
});
