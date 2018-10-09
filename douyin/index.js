const urllib = require('urllib');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://122.114.31.50:27017/food',
  {useNewUrlParser: true}
);
const db = mongoose.connection;
let model;

db.on('error', console.error.bind(console, '连接错误：'));
db.once('open', async callback => {
  const schema = mongoose.Schema(
    {
      uid: String,
      nickname: {type: String},
      shortid: String,
      extra: Array
    },
    {
      timestamps: true
    }
  );

  model = mongoose.model('douyin_user', schema);

  let user = await model.findOne({}).sort('-createdAt');

  let uid = 0;
  if (user) uid = +user.uid + 1;

  pq(uid);
  console.log('MongoDB连接成功！！');
});

async function pq(uid) {
  await iterator(uid);

  async function iterator (uid) {
    // console.log(uid);
    let result = await urllib.request(`https://www.douyin.com/share/user/${uid}`).catch(err => {
      console.log(err);
      return null;
    });

    if (!result) {
      uid = uid + 1;
      await iterator(uid);
      return;
    }

    let html = result.data.toString();

    let $ = cheerio.load(html, {
      decodeEntities: false
    });

    let nickname = $('p.nickname').text();

    if (!nickname) {
      uid = uid + 1;
      await iterator(uid);
      return;
    }

    let short_id_raw = $('.shortid').text();
    let shortid = getRealNum(short_id_raw);

    // let location = $('span.location').text();
    let extra = [];

    $('p.extra-info')
      .children()
      .each((i, e) => {
        extra.push($(e).text());
      });

    console.log(uid + ' ' +nickname + ' ' + shortid + ' ' + extra);

    await model.create({
      uid,
      nickname,
      shortid,
      extra
    });
    uid = uid + 1;

    await sleep(5000);

    await iterator(uid);
  }
}

function getRealNum(string) {
  // console.log('get real number');
  if (string.indexOf('抖音ID') >= 0) string = string.replace('抖音ID：', '');
  if (string.indexOf('关注') >= 0) string = string.replace('关注', '');
  if (string.indexOf('粉丝') >= 0) string = string.replace('粉丝', '');
  if (string.indexOf('赞') >= 0) string = string.replace('赞', '');
  string = string.replace(/\s/g, '');
  // console.log(string);
  var list = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  var dict = {
    '': 1,
    '': 0,
    '': 3,
    '': 2,
    '': 4,
    '': 5,
    '': 6,
    '': 9,
    '': 7,
    '': 8,
    '': 4,
    '': 0,
    '': 1,
    '': 5,
    '': 2,
    '': 3,
    '': 6,
    '': 7,
    '': 8,
    '': 9,
    '': 0,
    '': 2,
    '': 1,
    '': 4,
    '': 3,
    '': 5,
    '': 7,
    '': 8,
    '': 9,
    '': 6
  };
  // console.log(string);
  var result = '';
  for (var i = 0; i < string.length; i++) {
    if (list.includes(string[i])) result += dict[string[i]];
    else result += string[i];
  }
  return result;
}

function sleep(time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
