const util = require('util');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const loadMd = util.promisify(load_md);

async function load_md(dir, callback) {
    try {
        let files = await readdir(dir);

        files = files.filter(fileName => path.extname(fileName) === '.md');
        if (files.length === 0) return;

        let catalogues = [];

        for (let i = 0; i < files.length; i++) {
            let status = await stat(dir + '/' + files[i]);
            let file = await readFile(dir + '/' + files[i]);

            file = file
                .toString('utf8')
                .replace(/\s/g, '')
                .substr(0, 210);

            let fileName = files[i].split('.')[0];

            let md5 = crypto.createHash('md5');
            md5.update(fileName, 'uft8');
            let id = md5.digest('hex');

            catalogues.push({
                id,
                title: fileName,
                createTime: new Date(status.ctime).getTime(),
                abstract: file.length > 200 ? file + '...' : file
            });
        }

        if (catalogues.length) {
            catalogues.sort(compare('createTime'));

            catalogues.forEach((catalogue, i) => {
                if (catalogues.length <= 1) return;

                if (i !== catalogues.length - 1) catalogue.next = catalogues[i + 1].title;
                if (i !== 0) catalogue.prev = catalogues[i - 1].title;
            });

            callback(null, catalogues);
        }
    } catch (err) {
        callback(err);
    }
}

// (async () => {
//     try {
//         let catalogues = await loadMd('04/18/fs1');
//         let file = await readFile('04/18/fs/info.txt');
//         let reg = /\[((\n\s*)*{[^]*}(\n\s*)*)?]/g;
//         file = file.toString('utf8').replace(reg, JSON.stringify(catalogues));
//         await writeFile('04/18/fs/info.txt', file);
//         console.log('文章添加完毕！');
//     } catch (err) {
//         console.log(err);
//     }
// })();

load().then(data => console.log(data)).catch(err => console.log(err))

function load() {
    return new Promise((resolve, reject) => {
        return (async () => {
            try {
                let catalogues = await loadMd('04/18/fs');
                let file = await readFile('04/18/fs/info.txt');
                let reg = /\[((\n\s*)*{[^]*}(\n\s*)*)?]/g;
                file = file.toString('utf8').replace(reg, JSON.stringify(catalogues));
                await writeFile('04/18/fs/info.txt', file);
                resolve('文章添加完毕！');
            } catch (err) {
                reject(err);
            }
        })();
    });
}

function compare(property) {
    return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    };
}
