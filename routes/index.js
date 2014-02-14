exports.view = function(req, res){
  // @TODO: Check for logged in user. If logged in, redirect to appropriate home page.
  res.render('index');
};

exports.about = function(req, res){
  res.render('about');
};

exports.help = function(req, res){
  res.render('help');
};