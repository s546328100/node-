const bubbleSort = require('./bubbleSort.js');
const selectionSort = require('./selectionSort');
const insertionSort = require('./insertionSort');
const mergeSort = require('./mergeSort');
const quickSort = require('./quickSort');
const shellSort = require('./shellSort');
const heapSort = require('./heapSort');
const bucketSort = require('./bucketSort');

let arr = [];

// 生成随机整数
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成len长度的随机数组
function generateArr(len) {
    for (var i = 0; i < len; i++) {
        arr.push(random(1, len));
    }
}

generateArr(100000);
let _arr = [].concat(arr);

console.time('冒泡排序bubbleSort');
bubbleSort(arr);
console.timeEnd('冒泡排序bubbleSort');

arr = [].concat(_arr);
console.time('选择排序selectionSort');
selectionSort(arr);
console.timeEnd('选择排序selectionSort');

arr = [].concat(_arr);
console.time('插入排序insertionSort');
insertionSort(arr);
console.timeEnd('插入排序insertionSort');

arr = [].concat(_arr);
console.time('希尔排序shellSort');
shellSort(arr);
console.timeEnd('希尔排序shellSort');

arr = [].concat(_arr);
console.time('合并排序mergeSort');
mergeSort(arr);
console.timeEnd('合并排序mergeSort');

arr = [].concat(_arr);
console.time('快速排序quickSort');
quickSort(arr);
console.timeEnd('快速排序quickSort');

arr = [].concat(_arr);
console.time('堆排序heapSort');
heapSort(arr);
console.timeEnd('堆排序heapSort');

arr = [].concat(_arr);
console.time('桶排序bucketSort');
bucketSort(arr);
console.timeEnd('桶排序bucketSort');