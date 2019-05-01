/*  Not working
var  express =require('express');
var path=require('path');
var eng= require('ejs');
var logger =require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser= require('body-parser');
var port =8000;
var routes =require('./routes/index');
//var user =require ('./routes/users');

var app = express();

//app.engine('html',swing.renderFile);
app.engine('.html', eng.renderFile);

//app.set('view',path.join(__dirname,'view'));

//app.set('views engine','jade');
app.set('view engine', 'ejs');


//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname,'public')));

app.use('/',routes);
/!*
app.get('/',function(req,res){
    res.render('index',{title:'Welcome to express'});
});
*!/

//app.use('/users',user);


//catch 404 and forward to error handler

app.use(function(req,res,next){
    var err= new Error('Not Found');
    err.status=404;
    next(err);
});

/!*
if(app.get('env')==='development'){
    app.use(function(err,req,res,next){
        res.status(err.status||500);
        res.render('error')
    })
}*!/
app.listen(port, function(){
    console.log('Server Started on Port'+port);
});*/
