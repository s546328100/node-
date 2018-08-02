let Promise = require('./myPromise.js');

let promise = new Promise((resolve, reject) => {
    resolve('hello');
});
promise
    .then()
    .then(
        data => {
            console.log(data);
            return new Promise((resolve, reject) => {
                resolve('👋');
            });
        },
        err => {
            console.log(err);
        }
    )
    .then(
        data => {
            console.log(data);
        },
        err => {
            console.log('🙅' + err);
        }
    );
