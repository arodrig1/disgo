
/**
 * Module dependencies.
 */

var flash = require('connect-flash');
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var partials = require('express-partials');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

var index = require('./routes/index');
// Example route
// var user = require('./routes/user');
var login = require('./routes/login');
var rider = require('./routes/rider');
var driver = require('./routes/driver');
var coordinator = require('./routes/coordinator');
var rides = require('./routes/rides');

var app = express();

app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
// Example route
// app.get('/users', user.list);
app.get('/login', login.view);
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.get('/about', index.about);
app.get('/help', index.help);

app.get('/rider/home', rider.home);

app.get('/driver/home', driver.home);
app.get('/driver/calendar', driver.calendar);

app.get('/coordinator/home', coordinator.home);

app.get('/rides', rides.list);
app.get('/rides/request', rides.request);
app.post('/rides/submit', rides.submit);
app.get('/rides/:id/review', rides.review);
app.post('/rides/:id/approve', rides.approve);
app.get('/rides/:id/edit', rides.edit);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});