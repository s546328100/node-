const urllib = require('urllib');
const cheerio = require('cheerio');

urllib
  .request('https://www.douyin.com/share/user/84990209480')
  .then(function(result) {
    let html = result.data.toString();
    // console.log(html);

    let $ = cheerio.load(html, {
      decodeEntities: false
    });
    
    let nickname = $('p.nickname').text();

    let short_id_raw = $('.shortid').text();
    let short_id = getRealNum(short_id_raw);

    // let location = $('span.location').text();
    let extra = [];

    $('p.extra-info').children().each((i, e) => {
      extra.push($(e).text());
    })
    
    console.log(nickname);
    console.log(short_id);
    console.log(extra);
  })
  .catch(function(err) {
    console.error(err);
  });

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
