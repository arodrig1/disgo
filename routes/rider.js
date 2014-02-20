var mongoose = require('mongoose'),
Coordinator = require('../models/coordinator.js'),
Driver = require('../models/driver.js'),
Rider = require('../models/rider.js'),
Ride = require('../models/ride.js'),
User = require('../models/user.js'),
ObjectId = mongoose.Types.ObjectId;

var _home = function(req, res){
	console.log("Loading user's rides from database...");

	var rides = [];
  	res.render('rider/home', data);
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