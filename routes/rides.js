var Ride = require('../models/ride.js');

exports.list = function(req, res) {
	console.log("Loading all rides for req.user from database...");
  var rideID = req.rideID;
  var ride = Ride.findById(rideID);
	res.render('rides/index', ride);
}

exports.request = function(req, res) {
  	res.render('rides/request');
};

exports.submit = function(req, res) {
	console.log("Logging requested ride in database...");
  	//req.session.returnTo = request.path;
  	var newRide = {
  		"from": "Wilbur",
  		"to": "Hewlett",
  		"time": "4:00pm"
  	}
  	data["rides"].push(newRide);
  	res.render('rider/home');
};

exports.review = function(req, res) {
	console.log("Fetching ride to review from database...");
  	res.render('rides/review');
};

exports.approve = function(req, res) {
	console.log("Approving ride in database...");
  	//req.session.returnTo = request.path;
  	res.redirect('/coordinator/home');
};

exports.edit = function(req, res) {
  var rideID = req.rideID;
  var ride = Ride.findById(rideID);
  res.render('rides/edit', ride);
};

