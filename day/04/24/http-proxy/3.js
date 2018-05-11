var http = require('http');

var s = http.createServer(function (req, res) {
    res.end("8082");
});

s.listen(8082);