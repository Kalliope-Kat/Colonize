var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function() {
    var User = mongoose.model('User');
    
    passport.serializeUser(function(user, done) {
        done(null, user.id); //Saved by id to the session
    });
    
    passport.deserializeUser(function(id, done) {
        User.findOne(
            {_id :id}, 
            '-password', //tells mongoose not to fetch the password
            function(err, user) {
                done(err, user);
            }
        );
    });
    
    require('./strategies/local.js')();
};