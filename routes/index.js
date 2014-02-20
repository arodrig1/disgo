exports.view = function(req, res){
  res.render('index', { user: req.user });
};

exports.about = function(req, res){
  res.render('about', data);
};

exports.help = function(req, res){
  res.render('help', data);
};