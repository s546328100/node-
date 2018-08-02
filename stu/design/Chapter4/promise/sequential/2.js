let tasks = [
    v => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(v);
                return resolve(222);
            }, 500);
        }).then();
    },
    v => {
        console.log(v);
        return 333;
    },
    v => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(v);
                return reject(444);
            }, 2000);
        }).then();
    }
];
let promise = Promise.resolve(111);
tasks.forEach(task => {
    promise = promise.then(v => {
        // let t = task(v);
        // return t[Symbol.toStringTag] === 'Promise' ? t.then() : t;
        return task(v);
    });
});
promise
    .then(() => {
        console.log(123);
    })
    .catch(err => console.log(err));
