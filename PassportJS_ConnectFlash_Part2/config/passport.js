var LocalStrategy= require('passport-local').Strategy;
var User =require('../app/models/user');

module.exports=function(passport){

     passport.serializeUser(function(user,done){
         done(null,user.id);

     });

     passport.deserializeUser(function(id,done){

         User.findById(id,function(err,user){
             done(err,user);
         });

     });
    passport.use('local-signup',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },
        function(req,email,password,done){
        process.nextTick(function(){
            var query =User.findOne({'local.username': email});
            query.then(function(user){
                console.log(user);
                if(user){
                   return done(null,false,req.flash('signupMessage','That email already taken'));
                }
               else{
                   var newUser= new User();
                   newUser.local.username=email;
                   newUser.local.password=password;

                   var promise = newUser.save();
                   promise.then(function (doc) {
                       done(null,newUser)
                      },function(err){
                       console.log(err);
                   });
               }
           });
        });
        }));
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true

    },function(req,email,password,done1){
        process.nextTick(function(){

            var query1 =User.findOne({'local.username':email});
            query1.then(function (user1) {
                console.log(user1);
                 if(!user1)
                    return done1(null,false,req.flash ('loginMessage','No user found'));
                if(user1.local.password != password)
                    return done1(null,false,req.flash ('loginMessage','Invalid Password'));
                return done1(null,user1);
                });
        })
        }
    ));


}
