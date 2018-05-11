const Koa = require('koa');
const proxy = require('koa-proxies');

const app = new Koa();

// middleware
app.use(
    proxy('/admin', {
        target: 'http://localhost:8081',
        changeOrigin: true,
        logs: true
    })
);

app.use(
    proxy('/app', {
        target: 'http://localhost:8082',
        changeOrigin: true,
        logs: true
    })
);

app.listen(3000);
