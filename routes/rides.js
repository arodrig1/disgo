var mongoose = require('mongoose'),
Coordinator = require('../models/coordinator.js'),
Driver = require('../models/driver.js'),
Rider = require('../models/rider.js'),
Ride = require('../models/ride.js'),
User = require('../models/user.js'),
ObjectId = mongoose.Types.ObjectId;

var _list = function(req, res) {
  var rideID = req.rideID;
  var ride = Ride.findById(rideID);
	res.render('rides/index', ride);
}

var _request = function(req, res) {
    res.render('rides/request');
}

var _submit = function(req, res) {
  var newRide = {
    driverUsername: "bayian",//CHANGE ME!
    driver: "Bayian",//CHANGE ME!
    riderUsername: req.user.username,
    rider: req.user.Name,
    to: req.body.dropdown2,
    from: req.body.dropdown1,
    date: req.body.date,
    time: req.body.ridetime
  };
  User.saveRide(req.user, newRide, function(){});
  req.flash('info', "Ride submitted!");
  res.redirect('rider/home');
}

var _review = function(req, res) {
  //console.log("Fetching ride to review from database...");
   res.render('rides/review');
}

var _approve = function(req, res) {
  //console.log("Approving ride in database...");
  //req.session.returnTo = request.path;
  res.redirect('/coordinator/home');
}

var _edit = function(req, res) {
  var rideID = req.rideID;
  var ride = Ride.findById(rideID);
  res.render('rides/edit', ride);
}

var _deleteRide = function(req, res) {

}

module.exports = {
    list: _list,
    request: _request,
    submit: _submit,
    review: _review,
    approve: _approve,
    edit: _edit,
    deleteRide: _deleteRide
}