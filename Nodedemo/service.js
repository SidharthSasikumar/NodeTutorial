var path = require('path');
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));


var server = app.listen(4000, function () {
    console.log('Node server is running..');
});

/*
app.post('/employees' , function (request , response) {

    var name = request.body.NAME;
    var email = request.body.EMAIL;
    var result = {NAME:name, Email:email};

    response.writeHead(200, { 'Content-Type': 'application/json'});
    response.end(JSON.stringify(result));
});

app.get('/employees' , function (request , response) {


    var result = {NAME:'hello', Email:'email'};

    response.writeHead(200, { 'Content-Type': 'application/json'});
    response.end(JSON.stringify(result));
});
*/

//!*************** REST SERVICE **************!/

app.post('/employees', function (request, response) {
    // response.set("Access-Control-Allow-Origin", "*");
    // response.set("Access-Control-Allow-Headers", "X-Requested-With");
    console.log(request.body.result);

    var name = request.body.NAME;
    var email = request.body.EMAIL;


    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "node"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var detail = {NAME: name, EMAIL: email};
        console.log(detail);
        con.query('INSERT INTO employee SET ?', detail, function (err, res) {
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



//!************Get-Method***********!//

app.get('/Employee-Display', function (request, response) {

    console.log(request.body.result);


    var mysql = require('mysql');
    var name1 = request.query.NAME1;
    console.log(name1);
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "node"
    })


    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var uname = name1;
        console.log(uname);
        con.query('SELECT * FROM employee WHERE NAME = ?',uname, function (err, rows, fields) {

            //******method 1****************
            /* console.log('Connection result error '+err);
            console.log('no of records is '+rows.length);
            response.writeHead(200, { 'Content-Type': 'application/json'});
            response.end(JSON.stringify(rows));*/
            //**********Method 2 *****************
            if (err) throw err;
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(rows));

        });
        con.end();
    });

})

app.post('/Employee-Update', function (request, response) {

    console.log(request.body.result);


    var mysql = require('mysql');
    var id = request.body.id;
    var name=request.body.NAMEid;
    var email=request.body.EMAILid;
    console.log(id);
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "node"
    })

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var uid = id;
        var detail = {NAME: name, EMAIL: email};

        con.query("UPDATE employee SET ? WHERE ID = ?",[detail,id], function (err, res) {
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