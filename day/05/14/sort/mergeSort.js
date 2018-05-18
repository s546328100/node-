function merge(left, right) {
    let result = [],
        il = 0,
        ir = 0;

    while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) result.push(left[il++]);
        else result.push(right[ir++]);
    }

    return result.concat(left.slice(il)).concat(right.slice(ir));
}

function mergeSort(myArray) {
    if (myArray.length < 2) return myArray;

    let middle = Math.floor(myArray.length / 2),
        left = myArray.slice(0, middle),
        right = myArray.slice(middle),
        params = merge(mergeSort(left), mergeSort(right));

    params.unshift(0, myArray.length);
    myArray.splice.apply(myArray, params);
    return myArray;
}

// let arr = [2, 3, 5, 1, 4, 7];
// console.log(mergeSort(arr));

module.exports = mergeSort;