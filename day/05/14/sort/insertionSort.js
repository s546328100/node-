function insertionSort(myArray) {
    let len = myArray.length;
    for (let i = 0; i < len; i++) {
        let value = myArray[i];
        let j;
        for (j = i - 1; j > -1 && myArray[j] > value; j--) {
            myArray[j + 1] = myArray[j];
        }
        myArray[j + 1] = value;
    }
    return myArray;
}

// let arr = [2, 3, 5, 1, 4, 7];
// console.log(insertionSort(arr));

module.exports = insertionSort;
