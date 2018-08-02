const express = require('express');

let app = express();

app.set('view engine', 'pug');

app.get('/home', (req, res) => {
    res.render('index', {date: new Date().toDateString()});
});

app.listen(+process.argv[2]);
