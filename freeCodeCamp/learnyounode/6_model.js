const fs = require('fs');
const path = require('path');

function filterFile(folder, ext, callback) {
    fs.readdir(folder, 'utf8', (err, data) => {
        if (err) return callback(err);
        data = data.filter(f => path.extname(f) === `.${ext}`);
        callback(null, data);
    });
}

module.exports = filterFile;
