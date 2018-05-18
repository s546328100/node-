function swap(myArray, p1, p2) {
    let temp = myArray[p1];
    myArray[p1] = myArray[p2];
    myArray[p2] = temp;
}

function partition(myArray, left, right) {
    let pivot = myArray[Math.floor((right + left) / 2)],
        i = left,
        j = right;

    while (i <= j) {
        while (myArray[i] < pivot) {
            i++;
        }

        while (myArray[j] > pivot) {
            j--;
        }

        if (i <= j) {
            swap(myArray, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(myArray, left, right) {
    if (myArray.length < 2) return myArray;

    left = typeof left !== 'number' ? 0 : left;
    right = typeof right !== 'number' ? myArray.length - 1 : right;

    let index = partition(myArray, left, right);

    if (left < index - 1) quickSort(myArray, left, index - 1);
    if (index < right) quickSort(myArray, index, right);

    return myArray;
}

// let arr = [1, 2, 3, 4,5];
// console.log(quickSort(arr));

module.exports = quickSort;