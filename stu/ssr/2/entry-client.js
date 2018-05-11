function indexOf(arr, item) {
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] === item) return i;
        if (i === arr.length - 1) return -1;
    }
}

console.log(indexOf([1,2,3,4], 3));