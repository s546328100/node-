const request = require('request')

// 最大的连接重试次数
const MAX_RETRYS = 10
let count = 0;

/**
 * 测试服务器是不是还活着
 * @method {Function} resolve Promise的成功调用方法
 * @method {Function} reject Promise的失败调用方法
 */
const ping = async (resolve, reject) => {
    const response = request.get('http://dusuchao.xin');
    if(response.status === 200) {resolve();}
    else if(count > MAX_RETRYS) {reject();}
    
    count += 1;
}

// 以下是异步定时调用方法
// 每隔1秒重新ping一次
const tasks = [...Array(MAX_RETRYS + 1).keys()].map(i => {
    return new Promise((resolve,reject) => {
        setTimeout(ping(resolve, reject), i * 1000)
    })
})

// 处理ping通的
Promise.race(tasks).then(() => {console.log(123)})
.catch(() => {console.log(456)})
