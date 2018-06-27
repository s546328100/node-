let corp = {};
corp.list = {};

corp.on = function(key, fn) {
    if (!this.list[key]) this.list[key] = [];
    this.list[key].push(fn);
};

corp.emit = function() {
    let key = [].shift.call(arguments),
        fns = this.list[key];
    if (!fns || fns.length === 0) return false;
    fns.forEach(fn => {
        fn.apply(this, arguments);
    });
};

// 测试用例
corp.on('join', (position, salary) => {
    console.log('你的职位是：' + position);
    console.log('期望薪水：' + salary);
});
corp.on('other', (skill, hobby) => {
    console.log('你的技能有： ' + skill);
    console.log('爱好： ' + hobby);
});

corp.emit('join', '前端', 10000);
corp.emit('join', '后端', 10000);
corp.emit('other', '端茶和倒水', '足球');
