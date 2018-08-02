var express = require('express');
var app = express();

app.get('/books', function(req, res) {
    require('fs').readFile(process.argv[3], (err, data) => {
        if (err) res.send(err);
        data = JSON.parse(data);
        res.json(data);
    });
});

app.listen(process.argv[2]);
