var mongoose = require('mongoose');
var Coordinator = require('../models/coordinator.js');
var Driver = require('../models/driver.js');
var Rider = require('../models/rider.js');
var Ride = require('../models/ride.js');
var User = require('../models/user.js');
var ObjectId = mongoose.Types.ObjectId;

var _home = function(req, res) {
    console.log(req.user);
    console.log("Loading user's rides from database...");
    var user = req.user;
    User.findByUsername(user.username, function(err, riderDocs) {
        if (err) throw err;
        res.set('cache-control', 'no-cache');
        res.set('Content-Type', 'application/json');
        console.log("rider docs: " + riderDocs);
        res.send('rider/home', riderDocs);
    });
}

var _addRide = function(req, res) {
    
}

module.exports = {
    home: _home
}