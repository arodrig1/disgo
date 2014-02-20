var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy(
      function(req, username, password, done) {
        process.nextTick(function() {
          User.findOne({ 'username': username }, function(err, user) {
            if (err) return done(err);
            if (user) return done(null, false, "That username is already taken");
            else {
              var newUser = new User();
              newUser.username = username;
              newUser.
              newUser.save(function(err) {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }));
};
