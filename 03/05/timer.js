let date1 = new Date();

let date2 = new Date(date1);
date2.setDate(date1.getDate() + 1);

let dayArr = [1, 2, 3, 4, 5, 6, 7];
let day = date2.getDay();

let new1 = dayArr.map(m => (m - (day)));

console.log(new1);

console.log(date2.toLocaleDateString());

let date3 = new Date(new Date() -1);
console.log(date3.toLocaleDateString());