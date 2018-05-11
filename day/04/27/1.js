let s = `
re发的反而十点多
`;

let r = s.match(/[^\x00-\xff]/g).join('');
console.log(r);