const http = require('http');

let args = process.argv;
let index = 2;

function iteor(i) {
    if (!args[i]) return;

    http.get(args[i], res => {
        let str = '';
        res.on('data', data => {
            str += data.toString();
        });
        res.on('end', () => {
            console.log(str);
            iteor(++index);
        });
    });
}

iteor(index);
