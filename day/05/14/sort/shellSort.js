function shellSort(arr) {
    let len = arr.length,
        temp,
        j,
        gap = 1;

    while (gap < len / 3) {
        gap = gap * 3 + 1;
    }

    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
        for (let i = gap; i < len; i++) {
            temp = arr[i];
            for (j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    return arr;
}

// let arr = [2, 3, 5, 4, 7, 1, 6, 10, 8, 11];
// console.log(shellSort(arr));

module.exports = shellSort;