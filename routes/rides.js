var mongoose = require('mongoose'),
Coordinator = require('../models/coordinator.js'),
Driver = require('../models/driver.js'),
Rider = require('../models/rider.js'),
Ride = require('../models/ride.js'),
User = require('../models/user.js'),
ObjectId = mongoose.Types.ObjectId;

var _list = function(req, res) {
	console.log("Loading all rides for req.user from database...");
  var rideID = req.rideID;
  var ride = Ride.findById(rideID);
	res.render('rides/index', ride);
}

var _request = function(req, res) {
    res.render('rides/request');
}

var _submit = function(req, res) {
  console.log("Logging requested ride in database...");
    //req.session.returnTo = request.path;
    console.log("SUBMIT REQUEST:" + req.body.dropdown1);
    var newRide = {
      username: req.user.username,
      to: req.body.dropdown2,
      from: req.body.dropdown1,
      date: req.body.date,
      time: req.body.timee
    };
    User.saveRide(req.user, newRide, function(){});
    res.render('rider/home');
}

var _review = function(req, res) {
  console.log("Fetching ride to review from database...");
    res.render('rides/review');
}

var _approve = function(req, res) {
  console.log("Approving ride in database...");
    //req.session.returnTo = request.path;
    res.redirect('/coordinator/home');
}

var _edit = function(req, res) {
  var rideID = req.rideID;
  var ride = Ride.findById(rideID);
  res.render('rides/edit', ride);
}

module.exports = {
    list: _list,
    request: _request,
    submit: _submit,
    review: _review,
    approve: _approve,
    edit: _edit
}

