'use strict';

const concatFiles = require('./1');

concatFiles(process.argv[2], process.argv.slice(3), () => {
    console.log('Files concatenated successfully');
});
