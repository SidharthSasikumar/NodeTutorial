var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

var server = app.listen(4000, function () {
    console.log('Node server is running..');
});

/*************** REST SERVICE **************/
app.post('/employees', function (request, response) {
    // response.set("Access-Control-Allow-Origin", "*");
    // response.set("Access-Control-Allow-Headers", "X-Requested-With");
    console.log(request.body.result);

    var name = request.body.NAME;
    var email = request.body.EMAIL;



    var con = mysql.createConnection({
        host: "localhost",
        user: "dbadmin",
        password: "Oracle@123",
        database: "chatbot"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var detail = {NAME: name, EMAIL: email};
        con.query('INSERT INTO EMPLOYEES SET ?', detail, function (err, res) {
            if (err) {
                console.log('Error in saving record :: ', err);
            } else {
                response.setHeader('Content-Type', 'text/html');
                response.send("Record Inserted::"+res.insertId);
                response.end();
            }
            con.end();
        });
    });

})