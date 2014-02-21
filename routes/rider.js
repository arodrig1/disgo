var mongoose = require('mongoose');
var Coordinator = require('../models/coordinator.js');
var Driver = require('../models/driver.js');
var Rider = require('../models/rider.js');
var Ride = require('../models/ride.js');
var User = require('../models/user.js');
var ObjectId = mongoose.Types.ObjectId;

var _home = function(req, res) {
    console.log("Loading user's rides from database...");
    var user = req.user;
    // User.findByUsername(user.username, function(err, riderDocs) {
    //     if (err) throw err;
    //     //res.set('cache-control', 'no-cache');
    //     //res.set('Content-Type', 'application/json');
    //     console.log("rider docs: " + riderDocs);
    //     Ride.findByUsername(user.username, function(err, rideDocs) {
    //         if (err) throw err;
    //         console.log("RIDES" + rideDocs);
    //         res.render('rider/home', { 'rider': riderDocs, 'rides': rideDocs });
    //     });
    // });

            Ride.findByUsername(user.username, function(err, rideDocs) {
            if (err) throw err;
            console.log("RIDES" + rideDocs);
            //rideDocs = {'username': "divs"};
            res.render('rider/home', {'rides': rideDocs });
        });
}

var _addRide = function(req, res) {

}

module.exports = {
    home: _home
}