function compute_intersection(arr1, arr2, callback) {
    var bigger = arr1.length > arr2.length ? arr1 : arr2;
    var smaller = bigger == arr1 ? arr2 : arr1;
    var biglen = bigger.length;
    var smlen = smaller.length;

    var sidx = 0;
    var size = 100; // 100 at a time, can adjust!
    var results = [];

    function sub_compute_intersection() {
        for (var i = sidx; i < sidx + size && i < biglen; i++) {
            for (var j = 0; j < smlen; j++) {
                if (bigger[i] == smaller[j]) {
                    results.push(smaller[j]);
                    break;
                }
            }
        }

        if (i >= biglen) {
            callback(null, results);
        } else {
            sidx += size;
            process.nextTick(sub_compute_intersection);
        }
    }

    sub_compute_intersection();
}

function randomFn() {
    return Math.floor(Math.random() * 10000);
}
var a1 = [];
var a2 = [];
for (let i = 0; i < 100000; i++) {
    let aa1 = randomFn();
    let aa2 = randomFn();
    a1.push(aa1);
    a2.push(aa2);
}

setTimeout(() => {
    console.log(456);
}, 0);

setTimeout(() => {
    console.log(789);
}, 0);

console.log(123);

new Promise(resolve => {
    resolve();
}).then(function() {
    compute_intersection(a1, a2, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log('results');
        }
    });
    console.log('then1');
});

new Promise(resolve => {
    resolve();
}).then(function() {
    console.log('then2');
});

// 123
// then1
// then2
// results
// 456
// 789
