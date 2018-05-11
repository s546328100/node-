const moment = require('moment');

function generateDateAxis(config) {
    // 合并参数
    let p = Object.assign(
        {
            // 类型
            type: '年',
            // 方向
            direction: 'prev',
            // 模板
            source: '',
            target: 'YYYYMMDD',
            // 开始
            start: moment(),
            // 时间轴长度，默认2个
            length: 2,
            // 处理时间轴单个时间的方法
            forEach: function(item, idx, axis) {
                return item;
            },
            // 停止添加时间轴元素的方法
            stop: function(item, idx, axis) {
                return false;
            },
            // 升序 ascend(asc) || 降序 descend(desc)
            sort: 'asc'
        },
        config
    );

    // 时间类型映射表
    const DATE_TYPE_MAP = {
        'year|年': 'years',
        'month|月': 'months',
        'week|周|星期': 'weeks',
        'day|日|天': 'days'
    };
    // 类型
    let type = '',
        tstr,
        treg;

    // 根据参数type获取moment需要加减的单位(年|月|星期|日)
    for (tstr in DATE_TYPE_MAP) {
        treg = new RegExp(tstr);
        if (treg.test(p.type)) {
            type = DATE_TYPE_MAP[tstr];
            break;
        }
    }

    let direction = p.direction === 'prev' ? 'subtract' : 'add', // 减 || 加
        Sattern = p.source || p.target, // 源模板
        Tpattern = p.target, // 目标模板
        start = p.start, // 开始时间
        sort = p.sort === 'asc' ? 'unshift' : 'push', // 排序
        unit, // 时间轴单个元素
        idx = 0, // 时间轴下标
        newStart;

    // 循环获取单个时间，并通过forEach方法处理，然后放入result数组返回
    let axis = (function loop(l, r) {
        newStart = moment(start, Sattern)
            [direction](idx, type)
            .format(Tpattern);

        // 处理生成的时间轴元素
        unit = p.forEach(newStart, idx, r);

        // 处理后的元素合法则放进结果数组
        r[sort](unit);

        if (r.length === l || p.stop(unit, idx, r)) {
            return r;
        }

        idx++;

        return loop(l, r);
    })(p.length, []);

    return axis;
}

let result = generateDateAxis({
    // 类型
    type: '日',
    // 方向
    direction: 'prev',
    // 模板
    source: 'YYYYMM',
    target: 'YYYY-MM-DD',
    // 开始
    start: moment(),
    // 时间轴长度，默认2个
    length: 30,
    // 处理时间轴单个时间的方法
    forEach: function (item, idx, axis) {
        return item;
    },
    // 停止添加时间轴元素的方法
    stop: function (item, idx, axis) {
        return false;
    },
    // 升序 ascend(asc) || 降序 descend(desc)
    sort: 'asc'
});
console.log(result);