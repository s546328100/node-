'use strict';

const tar = require('tar');
const fstream = require('fstream');
const path = require('path');

const destination = path.resolve(process.argv[2]);
const sourceA = 'C:\\Users\\admin\\Desktop\\dsc\\node2018\\stu\\design\\Chapter5\\streams\\fork';
const sourceB = 'C:\\Users\\admin\\Desktop\\dsc\\node2018\\stu\\design\\Chapter5\\streams\\readable';

const pack = new tar.Pack();
pack.pipe(fstream.Writer(destination));

let endCount = 0;
function onEnd() {
    if (++endCount === 2) {
        pack.end();
    }
}

const sourceStreamA = fstream.Reader({type: 'Directory', path: sourceA}).on('end', onEnd);

const sourceStreamB = fstream.Reader({type: 'Directory', path: sourceB}).on('end', onEnd);

sourceStreamA.pipe(
    pack,
    {end: false}
);
sourceStreamB.pipe(
    pack,
    {end: false}
);
