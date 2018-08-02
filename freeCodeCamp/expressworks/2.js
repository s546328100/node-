const express = require('express');

let app = express();

app.use(express.static(process.argv[3]));

app.listen(+process.argv[2]);
