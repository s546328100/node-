function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) list[i] = list[k];
    list.pop();
}

let list = [1, 2, 3, 4, 5];
spliceOne(list, 1);
console.log(list);