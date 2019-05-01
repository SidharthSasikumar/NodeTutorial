var express= require('express');
var app= express();
var port=process.env.PORT || 3000;

var morgan =require('morgan');

app.use(morgan('dev'));
app.use('/',function(req,res){
    res.send("OuR FiRsT ExPrEsS PrOgRaM");
    //res.send('<h1>some html</h1>');
    //res.send(new Buffer('whoop'));
    //res.send({ some: 'json' });
    //res.status(404).send('Sorry, we cannot find that!');
    //res.status(500).send({ error: 'something blew up' });
});

app.listen(port);
console.log("Server running on port"+port);




