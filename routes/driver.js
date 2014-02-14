var data = require("../data.json");

exports.home = function(req, res){
	console.log("Loading driver's rides from database...");
	//data["riders"]
	var rides = [];
  	res.render('driver/home', data);
};

exports.calendar = function(req, res){
	console.log("Loading driver's calendar from database...");
	var rides = [];
  	res.render('driver/calendar', data);
};