let arr = [
    {
        _id: 'db06c78d1e24cf708a14ce81c9b617ec',
        industryName: '生鲜',
        createTime: '1500014677011',
        updateTime: '1524124641884',
        state: 1
    },
    {
        _id: 'faa573520a414f3d928260670984ba4f',
        industryName: '饲料行业',
        createTime: '1499997571205',
        updateTime: '1523501345935',
        state: 1
    },
    {
        _id: 'de7dfbc24b2ee5791925c2c4535267a4',
        industryName: '种植',
        createTime: '1506666670162',
        updateTime: '1510639759052',
        state: 1
    },
    {
        _id: '7fd0896e476480e5e2e52af847921fd6',
        industryName: '农业',
        createTime: '1510638993483',
        updateTime: '1510638993483',
        state: 1
    },
    {
        _id: '850c75f9f4bf4ea2bde98a94b5ea8be1',
        industryName: '果蔬',
        createTime: '1499997571203',
        updateTime: '1499997571203',
        state: 1
    },
    {
        _id: '7cdc2148fd67432192c4774dff969777',
        industryName: '农业',
        createTime: '1499997571201',
        updateTime: '1499997571201',
        state: 1
    },
    {
        _id: '436b3d35e28242228eda274e877ec663',
        industryName: '粮食',
        createTime: '1499997571198',
        updateTime: '1499997571198',
        state: 1
    },
    {
        _id: '2a38e0529b5d426c9c78ff6f93a4589a',
        industryName: '纺织',
        createTime: '1499997571182',
        updateTime: '1499997571182',
        state: 1
    }
];

let a = ['粮食', '饲料', '农业']
let v = {};
let s = arr.filter(f => {
    if (v[f.industryName]) return false;
    for (let i = 0; i < a.length; i++) {
        if ((f.industryName).startsWith(a[i])) {
            v[f.industryName] = 1;
            return true;
        }
    }
});
console.log(s);