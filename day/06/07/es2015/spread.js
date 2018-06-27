let obj = {
    name: 123
};

let obj1 = obj;
let objClone = {...obj};

objClone.name = 456;
obj1.name = 789;

console.log(objClone); // 456
console.log(obj); // 789
console.log(obj1); // 789

let s = {
    name: 'pop',
    age: 18
};

let ss = {
    like: 'papa'
}

let sss = {...s, ...ss};
console.log(sss); // { name: 'pop', age: 18, like: 'papa' }