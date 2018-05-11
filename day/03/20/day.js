function getDates(startDate, endDate, isObject) {
    let dates = [],
        obj = {},
        i = 0;

    let startTime = startDate;
    let endTime = endDate;

    while (endTime.getTime() - startTime.getTime() >= 0) {
        if (!isObject) dates[i] = dateFormat('yyyy.MM.dd', startTime);
        else {
            obj[dateFormat('yyyy.MM.dd', startTime)] = 0;
            dates = obj;
        }

        startTime.setDate(startTime.getDate() + 1);
        i += 1;
    }

    return dates;

    // function getDate(datestr) {
    //     let temp = datestr.split('-');
    //     let date = new Date(temp[0], temp[1] - 1, temp[2]);
    //     return date;
    // }
}

let date1 = new Date();
let date2 = new Date(date1);
date2.setDate(date1.getDate() - 29);
console.log(getDates(date2, date1, true));

function dateFormat(fmt, date) {
    //author: meizz
    let o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    return fmt;
}

console.log(dateFormat('yyyy.MM.dd', new Date()));