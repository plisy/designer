var path = require('path');
var express = require('express');


var app = express();

/*
application: polymer-designer
 version: 1
 runtime: python27
 api_version: 1
 threadsafe: yes

 handlers:
 - url: /
 static_files: build.html
 upload: build.html

 - url: /build.js
 static_files: build.js
 upload: build.js

 - url: /preview.html
 static_files: preview.html
 upload: preview.html

 - url: /components
 static_dir: components

 - url: /elements
 static_dir: elements

 - url: /assets
 static_dir: assets

*/

app.use('/', express.static(path.resolve('./')));


var port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log('App started at http://localhost:' + port + '/');
});