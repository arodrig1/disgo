var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');
var Rider = require('../models/rider.js');

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
      return User.validatePassword(username, password, done);
      /*User.validatePassword(username, password, function(status) {
        if (status['success']) return done(null, status['user']);
        else return done(null, false, { message: status['message'] });
      });*/
    }));

  passport.use('signup', new LocalStrategy(
    function(username, password, done) {
      User.findOne(username, done, function(err, user) {
        console.log("DONE: " + done);
        if (err) return done(err);
        if (user) return done(null, false, { message: "That username is already taken" });
        else {
          return User.create(username, password, 1, done);
        }
      });
    }));
};
