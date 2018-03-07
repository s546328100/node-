// --- 1 ---
let promise = new Promise((resolve, reject) => {
    resolve(123);
});

promise.then(value => {
    console.log(value);
});

// --- 2 ---
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}

timeout(1000).then(value => {
    console.log(value);
});

// --- 3 ---
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('fail'));
    }, 3000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(p1);
    }, 1000);
});

p2.then(result => console.log(result)).catch(err => console.log(err));
