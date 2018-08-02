const {each} = require('./each');

each({one: 1, two: 2}, (arr, callback) => {
    console.log('kais--');
    setTimeout(() => {
        console.log(arr);
        callback();
    }, 0);
}, (err, val) => {
    console.log(err);
    console.log(val);
});