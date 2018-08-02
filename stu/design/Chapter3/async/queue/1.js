const {queue} = require('./queue');

var q = queue(function(task, callback) {
    console.log(task.name);
    setTimeout(() => {
        console.log('hello ' + task.name);
        callback();
    }, 0);
}, 2);

let arr = [
    {
        name: 123
    },
    {
        name: 456
    },
    {
        name: 789
    },
    {
        name: 'asd'
    },
    {
        name: 'fgh'
    }
];

arr.forEach(e =>
    q.push(e, err => {
        console.log(e.name + ' over');
    })
);
