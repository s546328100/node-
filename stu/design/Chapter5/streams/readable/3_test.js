'use strict';

const RandomStream = require('./3');
const randomStream = new RandomStream();

randomStream.on('readable', () => {
    let chunk;
    while ((chunk = randomStream.read()) !== null) {
        console.log(`Chunk received: ${chunk.toString()}`);
    }
});
