const express = require('express');
const bp = require("body-parser");
const route = require('./server/config/petroutes.js');

const app = express();

app.use(express.static(__dirname + '/beltexam/dist/beltexam'));
app.use(bp.json());

route.Routify(app);

app.listen(8000, () => console.log('Listening on 8000:'));