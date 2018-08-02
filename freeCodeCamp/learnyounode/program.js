const fs = require('fs');
const path = require('path');

fs.readdir(process.argv[2], 'utf8', (err, data) => {
    data.filter(f => {
        let ext = path.extname(f);
        return ext === `.${process.argv[3]}`;
    }).forEach(e => console.log(e));
});
