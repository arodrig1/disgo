exports.home = function(req, res){
	console.log("Loading coordinator's information from database...");
  	res.render('coordinator/home');
};

