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

let promise = tasks.reduce((prev, task) => {
    return prev.then((v) => {
        return task(v);
    });
}, Promise.resolve(111));

promise
    .then(() => {
        console.log(123);
    })
    .catch(err => console.log(err));
