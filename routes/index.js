
/*
 * GET home page.
 */

exports.view = function(req, res){
  // @TODO: Check for logged in user. If logged in, redirect to appropriate home page.
  res.render('index');
};