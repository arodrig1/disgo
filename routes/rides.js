var mongoose = require('mongoose'),
Coordinator = require('../models/coordinator.js'),
Driver = require('../models/driver.js'),
Rider = require('../models/rider.js'),
Ride = require('../models/ride.js'),
User = require('../models/user.js'),
Timing = require('../models/timing.js'),
ObjectId = mongoose.Types.ObjectId;

var _list = function(req, res) {
  var rideID = req.rideID;
  var ride = Ride.findById(rideID);
	res.render('rides/index', ride);
}

var _getTodayString = function() {
  var today = new Date();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  today = today.getFullYear() + '-' + month + '-' + day;
  return today;
}

var _request = function(req, res) {
  res.render('rides/request', { 'today': _getTodayString(), 'alt': false });
}

var _requestb = function(req, res) {
  res.render('rides/request', { 'today': _getTodayString(), 'alt': true });
}

var _submit = function(req, res) {
  Timing.create("Ride request", req.body.testSet, req.body.elapsed, function(){});
  var newRide = {
    driverUsername: "bayian",//CHANGE ME!
    driver: "Bayian",//CHANGE ME!
    driverTel: "555-555-5555",
    riderUsername: req.user.username,
    rider: req.user.Name,
    to: req.body.dropdown2,
    from: req.body.dropdown1,
    date: req.body.date,
    time: req.body.ridetime,
    riderTel: req.user.tel
  };
  User.saveRide(req.user, newRide, function(){});
  req.flash('info', "Ride submitted!");
  res.redirect('rider/home');
}

var _updateRide = function(req, res) {
  var updatedRide = {
    to: req.body.dropdown2,
    from: req.body.dropdown1,
    date: req.body.date,
    time: req.body.ridetime
  };
  Ride.updateById(req.params["id"], updatedRide, function(){});
  req.flash('info', "Ride updated!");
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
  var ID = req.params["id"];
  Ride.findById(ID, function(err, ride) {
      if (err) throw err;
      ride = ride.toObject();
      var date = ride.date;
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) month = '0' + month;
      if (day < 10) day = '0' + day;
      ride.date = date.getFullYear() + '-' + month + '-' + day;
      ride.today = _getTodayString();
      res.render('rides/edit', {'ride': ride });
    });
}

var _deleteRide = function(req, res) {
  var ID = req.params["id"];
  //ADD A CONFIRMATION
  Ride.removeById(ID, function(err, rides) {
        if (err) throw err;
        //console.log(rides);
        req.flash('info', "Ride deleted!");
        res.redirect('rider/home');
    });
}

module.exports = {
    list: _list,
    request: _request,
    requestb: _requestb,
    submit: _submit,
    review: _review,
    approve: _approve,
    edit: _edit,
    deleteRide: _deleteRide,
    updateRide: _updateRide
}