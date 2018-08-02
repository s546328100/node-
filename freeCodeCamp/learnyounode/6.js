const filterFile = require('./6_model');

filterFile(process.argv[2], process.argv[3], (err, data) => {
    if (err) return console.log(err);
    data.forEach(e => {
        console.log(e);
    });
});
