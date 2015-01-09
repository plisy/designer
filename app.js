var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');


var app = express();

app.use('/', express.static(path.resolve('./')));
app.use(bodyParser.json());

app.get('/files/:fileId', function (req, res) {
    fs.readFile('./files/' + req.params.fileId + '.html', function (err, file) {
        if (err) {
            res.statusCode = 404;
            res.json({
                message: 'Could not open file',
                error: err
            });

            return;
        }
        res.send(file);
    });
});

app.post('/files/:fileId', function (req, res) {

    if (req.params.fileId) {
        var filesFolder = './files/';

        if (!fs.existsSync(filesFolder)) {
            fs.mkdirSync(filesFolder);
        }

        var fileName  = filesFolder + req.params.fileId + '.html';

        fs.writeFile(fileName, req.body.content, function (err) {

            if (err) {
                res.statusCode = 500;
                res.json({
                    message: 'server error',
                    error: err
                });
                return;
            }

            res.send('OK');

        });

        return;

    }

    res.statusCode = 400;
    res.send('bad request');

});


var port = process.env.VCAP_APP_PORT ||  process.env.PORT || 8000;

app.listen(port, function () {
    console.log('App started at http://localhost:' + port + '/');
});