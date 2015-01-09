var path = require('path');
var express = require('express');


var app = express();

app.use('/', express.static(path.resolve('./')));


var port = process.env.VCAP_APP_PORT ||  process.env.PORT || 8000;

app.listen(port, function () {
    console.log('App started at http://localhost:' + port + '/');
});