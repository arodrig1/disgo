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

  passport.use('local', new LocalStrategy(
    function(username, password, done) {
      User.validatePassword(username, password, done);
    }));

  passport.use('local-signup', new LocalStrategy(
    function(username, password, done) {
      User.findOne(username, done, function(err, user) {
        if (err) return done(err);
        if (user) return done(null, false, "That username is already taken");
        else {
          User.create(username, password, 1, done);
        }
      });
    }));
};
