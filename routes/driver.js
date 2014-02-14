exports.home = function(req, res){
	console.log("Loading driver's rides from database...");
	var rides = [];
  	res.render('driver/home');
};

exports.calendar = function(req, res){
	console.log("Loading driver's calendar from database...");
	var rides = [];
  	res.render('driver/calendar');
};