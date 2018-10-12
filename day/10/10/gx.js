// new Array(31).fill(new Set())
// No，数组中所有Set集合为同一个

var moment = require('moment');

let listLoop = new Array(86400); // 一天
let map = new Map();

let day = moment()
  .startOf('day')
  .unix(); // 一天的开始时间

let s = moment('2018-10-12T08:22:52.120Z');
console.log(s);
let now = moment().unix();
console.log(now);

let s1s = doAction('123', '2018-12-10T08:22:52.120Z');
console.log(s1s);

doAction('123456', 1539245555488);

console.log(map);
console.log(listLoop);

// map val(obj) => index循环队列位置，time启动时间， service，method方法名称，obj参数
function doAction(id, time, service, method, obj) {
  if (!moment().isBefore(time)) return false;

  // 如果循环队列中已存在该id，需要先干掉，重新计时
  let slot = map.get(id);
  slot && slot.index && listLoop[slot.index].delete(id);

  // 将该id重新添加到循环队列中
  // 所有日期都转换成当天时间
  let now = moment(time)
    .year(moment().year())
    .month(moment().month())
    .day(moment().day())
    .unix();
  let slotIndex = now - day;
  console.log(slotIndex);
  listLoop[slotIndex] = listLoop[slotIndex] ? listLoop[slotIndex].add(id) : new Set().add(id);
  map.set(id, {index: slotIndex, time, service, method, obj});
}

// 每秒钟移动一个slot，这个slot对应的set集合中为今天所有id都为操作
// 如果所有slot对应的set集合都为空，则表示没有id可操作
// setInterval(function() {
//   let now = moment().unix();
//   let currentSlotIndex = now - day;
//   console.log(currentSlotIndex);

//   var slotSet = listLoop[currentSlotIndex];
//   if (slotSet && slotSet.size > 0) {
//     for (let id of slotSet.values()) {
//       let slot = map.get(id);
//       let day = moment()
//         .add(1, 'd')
//         .startOf('day');
//       if (moment(slot.time).isBefore(day)) {
//         // 执行完的id从map，set集合中剔除
//         let {service, method, obj} = slot;
//         if (service && method) {
//         } else {
//           map.delete(id);
//           slotSet.delete(id);
//         }
//       }
//     }
//   }
// }, 1000);

// 思路、注意Map集合的内心移除情况。
