var data = require("../data.json");

exports.view = function(req, res){
  // @TODO: Check for logged in user. If logged in, redirect to appropriate home page.
  res.render('index', data);
};

exports.about = function(req, res){
  res.render('about', data);
};

exports.help = function(req, res){
  res.render('help', data);
};