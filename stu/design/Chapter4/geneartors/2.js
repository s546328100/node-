'use strict';

const fs = require('fs');
const path = require('path');

function asyncFlow(generatorFunction) {
    function callback(err) {
        if (err) {
            return generator.throw(err);
        }
        const results = [].slice.call(arguments, 1);
        generator.next(results.length > 1 ? results : results[0]);
    }
    const generator = generatorFunction(callback);
    generator.next();
}

asyncFlow(function*(callback) {
    const fileName = __dirname + '\\' + path.basename(__filename);
    const myself = yield fs.readFile(fileName, 'utf8', callback);
    yield fs.writeFile( __dirname + '\\' + `clone_of_${path.basename(__filename)}`, myself, callback);
    console.log('Clone created');
});
