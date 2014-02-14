var data = require("../data.json");

exports.home = function(req, res){
	console.log("Loading coordinator's information from database...");
  	res.render('coordinator/home');
};

