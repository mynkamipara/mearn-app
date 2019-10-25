var LocalStrategy   = require('passport-local').Strategy;
var models          = require('../models/model');
var User            = models.User;
var constant        = require('../config/constant');
let mongoose        = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

//expose this function to our app using module.exports
module.exports = function(passport) {

   passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // === LOCAL SIGNUP =
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({ 'email' :  email}, async function(err, user) {
                //console.log(req.body)

                
                // if there are any errors, return the error
                if (err)
                    return done(err);
                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, { data: 'email already taken' });
                } else { 
                    var newUser = new User();
                    newUser.full_name = req.body.full_name;
                    newUser.email = email;
                    newUser.contact_number = req.body.contact_number;
                    newUser.gender = req.body.gender; 

                    var salt = bcrypt.genSaltSync(10);
                    newUser.password = bcrypt.hashSync(password, salt);
                    await newUser.save(async function(err){
                        if(err) console.log(err)
                        return done(null, true, newUser);
                    })      
                        
                }
            });
        });        
    }));

      // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        User.findOne({ 'email' :  email}, function(err, user) {
            if (err)
            return done(err); // req.flash is the way to set flashdata using connect-flash

            // if no user is found, return the message
            if (!user)
                return done(null, false, { data: 'These credentials do not match our records.' });

            if(user){
                bcrypt.compare(password, user.password).then(response => {
                    if (response !== true) {
                      console.log('passwords do not match');
                      return done(null, false, { data: 'passwords do not match' });
                    }
                    console.log('user found & authenticated');
                    //jwt toke generate
                    const token = jwt.sign({ 
                        id: user._id ,
                        email:user.email,
                        full_name:user.full_name
                        },
                     constant.secret);
                
                    return done(null, { data: 'login sucessfully',token:token });
                  });   
            }
        });
    }));


// JWT verify setup
var opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';
passport.use(new JWTstrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
  

};
