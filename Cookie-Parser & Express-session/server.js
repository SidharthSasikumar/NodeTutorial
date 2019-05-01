var express= require('express');
var app= express();
var port=process.env.PORT || 3000;
var cookieParser=require('cookie-parser');
var session=require('express-session');


var morgan =require('morgan');

app.use(morgan('dev'));
app.use(cookieParser());

app.use(session({
    secret:'anystringortext',
    saveUninitialized:true, //saveing permanent still be logged in
    resave:true //saving nothing is changed
}))

app.use('/',function(req,res){
    res.send("OuR FiRsT ExPrEsS PrOgRaM");
    console.log(req.cookies);
    console.log('================================');
    console.log(req.session);

});

app.listen(port);
console.log("Server running on port"+port);

