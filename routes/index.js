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
	res.render('help');
}

module.exports = {
	view: _view,
	about: _about,
	help: _help
}