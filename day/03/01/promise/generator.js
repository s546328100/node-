function getFoo() {
    return new Promise((resolve, reject) => {
        resolve('foo');
    });
}

const g = function*() {
    try {
        const foo = yield getFoo();
        console.log(foo);
    } catch (error) {
        console.log(error);
    }
};

function run(generator) {
    const it = generator();

    function go(result) {
        if (result.done) return result.value;

        return result.value.then(
            value => {
                return go(it.next(value));
            },
            err => {
                return go(it.throw(err));
            }
        );
    }

    go(it.next());
}

run(g);
