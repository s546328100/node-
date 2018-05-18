function swap(myArray, p1, p2) {
    let temp = myArray[p1];
    myArray[p1] = myArray[p2];
    myArray[p2] = temp;
}

function bubbleSort(myArray) {
    let len = myArray.length;
    let i;
    let j;
    let stop;

    for (i = 0; i < len - 1; i++) {
        for (j = 0, stop = len - 1 - i; j < stop; j++) {
            if (myArray[j] > myArray[j + 1]) swap(myArray, j, j + 1);
        }
    }

    return myArray;
}

// let arr = [2, 3, 5, 1, 4, 7];
// console.log(bubbleSort(arr));

module.exports = bubbleSort;