const fs = require('fs');

function load_list(callback) {
    fs.readdir('03', (err, files) => {
        if (err) {
            callback(err);
            return;
        }

        let only_dirs = [];
        for (let i = 0; i < files.length; i++) {
            fs.stat('03/' + files[i], (err, stats) => {
                if (stats.isDirectory()) only_dirs.push(files[i]);
            });
        }

        callback(null, only_dirs);
    });
}

load_list((err, albums) => {
    if (err) console.log(err);
    else console.log(albums);
});

// []