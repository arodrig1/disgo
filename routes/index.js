var mongoose = require('mongoose'),
Coordinator = require('../models/coordinator.js'),
Driver = require('../models/driver.js'),
Rider = require('../models/rider.js'),
Ride = require('../models/ride.js'),
User = require('../models/user.js'),
ObjectId = mongoose.Types.ObjectId;

var _view = function(req, res){
  // @TODO: Check for logged in user. If logged in, redirect to appropriate home page.
  if (req.user) {
  	var type = req.user.type;
  	if (type == 1)
  		res.render('rider/home');
  	else if (type == 0)
  		res.render('driver/home');
  	else
  		res.render('index');
  }  
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