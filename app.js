/**
 * Module dependencies.
 */
var flash = require('connect-flash');
var express = require('express');
var passport = require('passport');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var handlebars = require('express3-handlebars');
var partials = require('express-partials');

var index = require('./routes/index');
var authentication = require('./routes/authentication');
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
  app.use(function(req, res, next) {
    res.locals.info = req.flash('info');
    res.locals.error = req.flash('error');
    next();
  });
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

require('./config/passport')(passport);

var MONGO = {
    uri: process.env.MONGOHQ_URL || 'mongodb://localhost/disgoDB',
    options: {
        server:{
            auto_reconnect: true,
            poolSize: 10,
            socketOptions:{
                keepAlive: 1
            }
        },
        db: {
            numberOfRetries: 10,
            retryMiliSeconds: 1000
        }
    }
}

mongoose.connect(MONGO.uri, MONGO.options);

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

function ensureAuthenticated(req, res, next) {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

app.get('/', index.view);
app.get('/login', authentication.login);
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
app.get('/signup', authentication.signup);
app.post('/signup', passport.authenticate('signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash: true
  }));
app.get('/logout', authentication.logout);
//app.get('/admin', pass.ensureAuthenticated, pass.ensureAdmin(), user_routes.admin);


app.get('/about', index.about);
app.get('/help', index.help);

app.get('/rider/home', ensureAuthenticated, rider.home);
//app.get('/rider/homeb', ensureAuthenticated, rider.homeb);
//app.get('/rider/addRide', rider.addRide);
//app.get('/rider/editRide/:id', rider.editRide);

app.get('/driver/home', ensureAuthenticated, driver.home);
//app.get('/driver/calendar', ensureAuthenticated, driver.calendar);

app.get('/coordinator/home', ensureAuthenticated, coordinator.home);

app.get('/rides', ensureAuthenticated, rides.list);
app.get('/rides/request', ensureAuthenticated, rides.request);
app.get('/rides/requestb', ensureAuthenticated, rides.requestb);
app.post('/rides/submit', ensureAuthenticated, rides.submit);
app.get('/rides/:id/review', ensureAuthenticated, rides.review);
app.post('/rides/:id/approve', ensureAuthenticated, rides.approve);
app.get('/rides/edit/:id', ensureAuthenticated, rides.edit);
app.get('/rides/deleteRide/:id', ensureAuthenticated, rides.deleteRide);
app.post('/rides/update/:id', ensureAuthenticated, rides.updateRide);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});