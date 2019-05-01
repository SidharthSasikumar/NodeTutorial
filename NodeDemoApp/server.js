var path = require('path');
var express = require('express');
var app = express();
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/view')); // html

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.get('/', function (req, res,next) {
    res.sendFile('index.html');
});

app.get('/home', function (req, res,next) {
    res.sendFile(path.join(__dirname,  'view/home.html'));
});

var server = app.listen(3000, function () {
    console.log('Node server is running..');
});
