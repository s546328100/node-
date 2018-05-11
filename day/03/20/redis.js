const Redis = require('ioredis');
const redis = new Redis(6379, '127.0.0.1');

redis.defineCommand('userSums', {
    lua: 'local result={} for i = 1,#(KEYS) do result[i]= redis.call("SCARD",KEYS[i]) end return result'
});

redis.keys(/user_*/).then(res => {
    console.log(res);
    // let keys = res;
    // redis.userSums(res.length, res, (err, res) => {
    //     console.log(res);
    //     let map = {};
    //     for (let i = 0; i < res.length; i++) {
    //         map[keys[i]] = res[i];
    //     }
    //     console.log(map);
    // });
});

// redis.defineCommand('userSums', {
//     lua: `local ks = redis.call('keys', KEYS[1]) local result={} for i = 1,#(ks) do result[i]= redis.call('SCARD',ks[i]) end return result`
// });

// redis.userSums(1, '2018*', (err, res) => {
//     console.log(res);
// })