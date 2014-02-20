var mongoose = require('mongoose');
//var Coordinator = require('../models/coordinator.js');
//var Driver = require('../models/driver.js');
//var Rider = require('../models/rider.js');
//var Ride = require('../models/ride.js');
//var User = require('../models/user.js');
//var ObjectId = mongoose.Types.ObjectId;

var _home = function(req, res) {
	var rides = [];
  	res.render('rider/home');
}

var _findById = function(req, res) {
    Rider.findById(req.params.id, function(err, riderDocs) {
        if (err) {
            throw err;
        }
        res.set('cache-control', 'no-cache');
        res.set('Content-Type', 'application/json');
        res.send(riderDocs);
    });
}

module.exports = {
    home: _home,
    findById: _findById
}