const createApp = require('./app')
const server = require('express')();

const render = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
});

server.get('*', (req, res) => {
    const app = createApp({ url: req.url });
    const context = {
        title: '123',
        meta: `
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
        `
    }
    render.renderToString(app, context, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error');
            return;
        }
        res.end(html);
    });
});

server.listen(8000);
