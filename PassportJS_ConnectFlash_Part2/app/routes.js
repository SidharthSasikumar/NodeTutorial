var User=require('./models/user');

const assert = require('assert');
module.exports=function (app,passport){
     app.get ('/',function(req,res){

         res.render('index.ejs');

     });
     app.get('/login',function(req,res){
         res.render('login.ejs',{message:req.flash('loginMessage')});
     });

    app.post('/login', passport.authenticate('local-login',{
            successRedirect: '/profile',
            failureRedirect:'/login',
            failureFlash:true
    }));


    app.get('/signup',function(req,res){
         res.render('signup.ejs',{ message:req.flash('signupMessage')});
     });


     app.post('/signup',passport.authenticate('local-signup',{
         successRedirect: '/',
         failureRedirect:'/signup',
         failureFlash:true
     }));


     app.get('/profile',isLoggedIn,function(req,res){
         res.render('profile.ejs',{user:req.user});
     });


     app.get('/:username/:password',function (req,res) {
        // res.send("hello");
         var newUser =new User();
         newUser.local.username=req.params.username;
         newUser.local.password= req.params.password;
         console.log(newUser.local.username+"  "+newUser.local.password);
         var promise = newUser.save();
         promise.then(function (doc) {
        console.log("doc" + doc);
             res.send("hello  " +doc.local.username+" password has been stored "+doc.local.password);
         },function(err){
             console.log(err);
         });

    });
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    })

};



function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}