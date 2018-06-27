let target = {age: 18, name: 'Niko Bellic'};
let handlers = {
    get(target, property) {
        return `${property}: ${target[property]}`;
    },
    set(target, property, value) {
        target[property] = value;
    }
};
let proxy = new Proxy(target, handlers);

proxy.age = 19;
console.log(target.age, proxy.age); // 19,          age : 19
console.log(target.name, proxy.name); // Niko Bellic, name: Niko Bellic
