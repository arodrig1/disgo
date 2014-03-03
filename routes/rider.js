var mongoose = require('mongoose');
var Coordinator = require('../models/coordinator.js');
var Driver = require('../models/driver.js');
var Rider = require('../models/rider.js');
var Ride = require('../models/ride.js');
var User = require('../models/user.js');
var ObjectId = mongoose.Types.ObjectId;

var _home = function(req, res) {
    var user = req.user;
    var name = user.Name;
    var name_array = name.split(" ");
    var first_name = name_array[0];
    Ride.findByRiderUsername(user.username, function(err, rides) {
        if (err) throw err;
        for (var i = 0; i < rides.length; i++) {
            rides[i] = rides[i].toObject();
            rides[i].date = rides[i].date.toDateString().split(" ").slice(0, 4).join(" ");
            var hour = parseInt(rides[i].time);
            if (hour > 12) hour = hour - 12;
            rides[i].time = hour + rides[i].time.slice(2,5);
        }
        res.render('rider/home', { 'rides': rides, 'name': first_name});
    });
}

var _addRide = function(req, res) {

}

module.exports = {
    home: _home
}