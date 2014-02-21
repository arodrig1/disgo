var mongoose = require('mongoose'),
Coordinator = require('../models/coordinator.js'),
Driver = require('../models/driver.js'),
Rider = require('../models/rider.js'),
Ride = require('../models/ride.js'),
User = require('../models/user.js'),
ObjectId = mongoose.Types.ObjectId;

var _view = function(req, res){
  res.render('login', { user: req.user }));
}

module.exports = {
    view: _view
}