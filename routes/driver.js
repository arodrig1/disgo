var mongoose = require('mongoose');
var Coordinator = require('../models/coordinator.js');
var Driver = require('../models/driver.js');
var Rider = require('../models/rider.js');
var Ride = require('../models/ride.js');
var User = require('../models/user.js');
var ObjectId = mongoose.Types.ObjectId;

var _home = function(req, res) {
    var user = req.user;
    Ride.findByDriverUsername(user.username, function(err, rides) {
        if (err) throw err;
        for (var i = 0; i < rides.length; i++) {
            rides[i] = rides[i].toObject();
            rides[i].date = rides[i].date.toDateString().split(" ").slice(0, 4).join(" ");
        }
        res.render('driver/home', { 'rides': rides });
    });
}

var _addRide = function(req, res) {

}

module.exports = {
    home: _home
}