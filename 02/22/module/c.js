var Person = require('./b');
var person = new Person('Tony', 33);
console.log(person); // {name:"Tony", age:33}
console.log(Person.sex); // undefined
