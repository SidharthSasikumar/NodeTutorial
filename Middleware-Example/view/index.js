var express= require('express');
var view=express.Router();


/*GET Home Page*/

view.get('/',function(req,res){
    res.render('index',{title:'Express'});
});

module.export=view;