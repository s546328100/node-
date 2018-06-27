const async = require('async');
const series = require('./my_series');

async.series(
    [
        async function runAsync(call) {
            console.log(123);
            await call(1)
        }
    ],
    function(err, results) {
        console.log(err);
        console.log(results);
        // results is now equal to: {one: 1, two: 2}
    }
);
