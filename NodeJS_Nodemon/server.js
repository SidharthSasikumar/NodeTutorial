var express= require('express');
var app= express();
var port=process.env.PORT || 3000;
var cookieParser=require('cookie-parser');
var session=require('express-session');
var mongoose =require('mongoose');
var bodyParser =require('body-parser');



var configDB =require('./config/database');
//mongoose.connect(configDB.url);
var promise = mongoose.connect(configDB.url, {
    useMongoClient: true ,
    /* other options */
});

promise.then(function(db) {
    /* Use `db`, for instance `db.model()`
  });
  // Or, if you already have a connection
  connection.openUri('mongodb://localhost/myapp', { /!* options */


},function (err){
    console.log(err);
}


);


var morgan =require('morgan');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({

    secret:'anystringortext',
    saveUninitialized:true, //saveing permanent still be logged in
    resave:true //saving nothing is changed
}));

app.set('view engine','ejs');


/*app.use('/',function(req,res){
    res.send("OuR FiRsT ExPrEsS PrOgRaM");
    console.log(req.cookies);
    console.log('================================');
    console.log(req.session);

});*/

require('./app/routes')(app);


app.listen(port);
console.log("Server running on port"+port);

