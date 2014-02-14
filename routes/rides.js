exports.list = function(req, res) {
	console.log("Loading all rides for req.user from database...");
	var rides = [];
	res.render('rides/index');
}

exports.request = function(req, res) {
  	res.render('rides/request');
};

exports.submit = function(req, res) {
	console.log("Logging requested ride in database...");
  	//req.session.returnTo = request.path;
  	res.redirect('/rider/home');
};

exports.review = function(req, res) {
	console.log("Fetching ride to review from database...");
  	res.render('rides/review');
};

exports.approve = function(req, res) {
	console.log("Approving ride in database...");
  	//req.session.returnTo = request.path;
  	res.redirect('/coordinator/home');
};

exports.edit = function(req, res) {
	console.log("Fetching ride to review from database...");
  	res.render('rides/edit');
};

