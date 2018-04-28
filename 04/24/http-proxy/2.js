var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

router.get('/admin/get', (ctx, next) => {
    // ctx.router available
    ctx.body = '123';
});

app.use(router.routes()).use(router.allowedMethods());

app.use(async ctx => {
    ctx.body = '555555';
    console.log(123123);
});

app.listen(8081);
