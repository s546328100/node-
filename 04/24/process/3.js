const readline = require('readline'),
    fs = require('fs');

let questions = ["What's your favorite color? ", 'Cats or dogs? '];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let output = [];

// 方法一：
// (function iterator(index) {
//     if (index === questions.length) {
//         fs.appendFileSync('answers.txt', JSON.stringify(output) + '\n');
//         console.log('\nThank!!');
//         rl.close();
//         return;
//     }
//     rl.question(questions[index], answer => {
//         output.push(answer);
//         iterator(index + 1);
//     });
// })(0);

// 方法二：
function question(q) {
    let p = new Promise((resolve, reject) => {
        rl.question(q, answer => {
            resolve(answer);
        });
    });
    return p;
}

(async () => {
    for (let i = 0; i < questions.length; i++) {
        let answer = await question(questions[i]);
        output.push(answer);
    }
    fs.appendFileSync('answers.txt', JSON.stringify(output) + '\n');
    console.log('\nThank!!');
    rl.close();
})();
