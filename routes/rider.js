exports.home = function(req, res){
	console.log("Loading user's rides from database...");
	var rides = [];
  	res.render('rider/home');
};