var mongoose = require('mongoose'),
Coordinator = require('../models/coordinator.js'),
Driver = require('../models/driver.js'),
Rider = require('../models/rider.js'),
RiderRoute = require('./rider.js'),
DriverRoute = require('./driver.js'),
Ride = require('../models/ride.js'),
User = require('../models/user.js'),
ObjectId = mongoose.Types.ObjectId;

var _view = function(req, res){
  if (req.user) {
  	var type = req.user.type;
  	if (type == 1) {
  		RiderRoute.home(req, res);
  	}
  	else if (type == 0) {
  		DriverRoute.home(req, res);
  	}
  }
  else res.render('index');
}

var _about = function(req, res){
	res.render('about');
}

var _help = function(req, res){
  var message = "";
  if(req.user.type == 0){
    message = "<h4> Viewing Your Schedule </h4> <p class = \"container\">Your live schedule should be displayed on your home screen.  Make sure to refresh to see if new rides have been added!</p><h4> Don't See any Rides? </h4> <p class = \"container\">You must not have any rides scheduled at this time.</p><h4> Other Issues?</h4> <div class = \"container\"><p>Contact our support team directly by emailing us at disgoapp.support@gmail.com. <br> We'll try to get back to you as soon as possible. </p></div><br><br><br>";
  }else{
    message = "<h4>Submitting a Ride Request</h4><p class = \"container\">To submit a ride, click the large blue button labeled \"Request a Ride\" and fill out the form.</p><h4>Can't Find Your Location?</h4><p class = \"container\">Our carts are not permited to drive everywhere on campus, so if you can't find your location in the drop down menu, choose the closest point!</p><h4>Editing a Ride Request</h4><p class = \"container\">To edit a ride request, click the blue edit button at the bottom of each ride and fill out the appropriate form. </p><h4>Viewing the Schedule</h4><p class = \"container\">Your home screen should also serve as a comprehensive schedule.  If you don't see any rides you may not have any scheduled. </p><h4>Other Issues?</h4><p class = \"container\">Contact our support team directly by emailing us at disgoapp.support@gmail.com. <br> We'll try to get back to you as soon as possible. </p><br><br><br>";
  }
	res.render('help', { 'message' : message});
  //req.user.type; //0 is driver 1 is rider
}

module.exports = {
	view: _view,
	about: _about,
	help: _help
}