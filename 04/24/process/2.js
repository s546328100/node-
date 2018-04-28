const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let p = 'postfix expression > ';
rl.setPrompt(p, p.length);
rl.prompt();

rl.on('line', line => {
    if (line == '\n') {
        console.log(123);
        rl.close();
        return;
    }

    let parts = line.split(new RegExp('[ ]+'));
    let r = postfix_process(parts);

    if (r !== false) process.stdout.write('Result: ' + r + '\n');
    else process.stdout.write('Invalid express.\n');
    rl.prompt();
});

rl.on('SIGINT', () => rl.close());

function postfix_process(parts) {
    let stack = [];
    for (let i = 0; i < parts.length; i++) {
        switch (parts[i]) {
            case '+':
            case '-':
            case '*':
            case '/':
                if (stack.length < 2) return false;
                do_op(stack, parts[i]);
                break;
            default:
                let num = parseFloat(parts[i]);
                if (isNaN(num)) return false;
                stack.push(num);
                break;
        }
    }
    if (stack.length !== 1) return false;
    return stack.pop();
}

function do_op(stack, operator) {
    let b = stack.pop();
    let a = stack.pop();
    switch (operator) {
        case '+':
            stack.push(a + b);
            break;
        case '-':
            stack.push(a - b);
            break;
        case '*':
            stack.push(a * b);
            break;
        case '/':
            stack.push(a / b);
            break;
        default:
            throw new Error('Unexpected operator');
    }
}
