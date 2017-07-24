var LocalStrategy       = require('passport-local').Strategy;
var path                = require('path');
var User                = require(path.join(__dirname,'..','models','user.js'));
var mongoose            = require('mongoose');
var dao                 = require('./dao.js');
module.exports = function(app,passport) {
    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  The
    // typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when
    // deserializing
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        dao.get(User,user._id.toString(),'name email phone',{},function(error,userById){
            done(error,userById);
        });
    });
    passport.use('local-login', new LocalStrategy({
            usernameField : 'phone',
            passwordField : 'password',
            passReqToCallback : true,
            session : true
        },function(req, email, password, done) {
            User.findOne(
                {
                    $and: [
                        { 'phone'   : { $eq : phonr } },
                        { 'regMode' : { $eq : 'LOCAL' } },
                        { 'active'  : { $eq : true } }
                    ]
                }, function(err, user) {
                if (err)
                    return done(err);
                if (!user){
                    return done(null, false,'');
                }
                if (!user.validPassword(password)){
                    return done(null, false, '');
                }else{
                    // app.locals.user_events.emit('SET_LOGIN_TIME',user,new Date());
                    // req.session.sessionStartTime=new Date();
                    return done(null, user);
                }
            });
        }
    ));
};
