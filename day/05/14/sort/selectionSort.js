function swap(myArray, p1, p2) {
    let temp = myArray[p1];
    myArray[p1] = myArray[p2];
    myArray[p2] = temp;
}

function selectionSort(myArray) {
    let len = myArray.length;
    for (let i = 0; i < len - 1; i++) {
        let max = 0;
        for (let j = 0, stop = len - 1 - i; j < stop; j++) {
            if (myArray[j + 1] > myArray[max]) max = j + 1;
        }
        swap(myArray, max, len - 1 - i);
    }
    return myArray;
}

function _selectionSort(myArray) {
    let len = myArray.length;
    for (let i = 0; i < len - 1; i++) {
        let min = i;
        for (let j = i + 1, stop = len; j < stop; j++) {
            if (myArray[j] < myArray[min]) min = j + 1;
        }
        if (i !== min) swap(myArray, min, i);
    }
    return myArray;
}

// let arr = [2, 3, 5, 1, 4, 7];
// console.log(selectionSort(arr));
// console.log(_selectionSort(arr));

module.exports = _selectionSort;
