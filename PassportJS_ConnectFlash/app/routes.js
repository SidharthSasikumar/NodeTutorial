var User=require('./models/user');

const assert = require('assert');
module.exports=function (app,passport){
     app.get ('/',function(req,res){

         res.render('index.ejs');

     });

     app.get('/signup',function(req,res){
         res.render('signup.ejs',{ message:req.flash('signupMessage')});
     });


     app.post('/signup',passport.authenticate('local-signup',{
         successRedirect: '/',
         failureRedirect:'/signup',
         failureFlash:true
     }));
     app.get('/:username/:password',function (req,res) {
        // res.send("hello");
         var newUser =new User();
         newUser.local.username=req.params.username;
         newUser.local.password= req.params.password;
         console.log(newUser.local.username+"  "+newUser.local.password);
        /* newUser.save(function(err){
             if(err)
                 throw err;
         });*/


         var promise = newUser.save();
         promise.then(function (doc) {
        console.log("doc" + doc);
             res.send("hello  " +doc.local.username+" password has been stored "+doc.local.password);
         },function(err){
             console.log(err);
         });

     /* newUser.save(function(err, record) {
          if(err) {
              console.log("err is " + err);
          } else {
              console.log("records " + record);
          }
      })*/

     })
}