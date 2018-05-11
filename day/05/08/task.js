// new Array(31).fill(new Set())
// No，数组中所有Set集合为同一个

let listLoop = new Array(5),
    currentSlotIndex = 1; // 当前要检测的slot

function doAction(uid) {
    // 将该uid重现添加到循环队列中
    // 周期31，新插入的置入当前的后一个（即，30s后可以扫描到它）
    // 更新map中这个uid的最新slotIndex
    let _currentSlotIndex = currentSlotIndex - 1;
    let slotIndex = _currentSlotIndex >= 0 ? _currentSlotIndex : listLoop.length - 1;
    listLoop[slotIndex] = listLoop[slotIndex] ? 
        listLoop[slotIndex].add(uid) : new Set().add(uid);
}

// 每秒钟移动一个slot，这个slot对应的set集合中所有uid都为超时
// 如果所有slot对应的set集合都为空，则表示没有uid超时
setInterval(function() {
    var slotSet = listLoop[currentSlotIndex];
    if(slotSet && slotSet.size > 0) {
        for(let uid of slotSet.values()) {
            console.log(`<${uid}>超过30s未做任何操作，设置为离线！`);
            console.log(new Date());
        }
        // 置空该集合
        slotSet.clear();
    }
    // 指标继续+1
    currentSlotIndex = (++currentSlotIndex) % 5;
    console.log(currentSlotIndex);
}, 1000 * 60);

// 思路、注意Map集合的内心移除情况。

setTimeout(() => {
    doAction(1);
    console.log(new Date());
}, 1000);

setTimeout(() => {
    doAction(100);
    console.log(new Date());
}, 60 * 1000);

setTimeout(() => {
    doAction(200);
    console.log(new Date());
}, 80 * 1000);