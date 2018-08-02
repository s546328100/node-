let s = '/admin/v2.1a/message/cntunread';
let name = 'admin';
let l = '/message/cntunread';

let reg = /\/admin\/v[1-9](\.[1-9])?\/message\/cntunread/

let reg1 = new RegExp(`^/${name}/v[1-9](\\.[1-9])?${l}$`);
console.log(reg1);

let ss = reg.exec(s);
let sss = reg1.test(s);

console.log(sss);
