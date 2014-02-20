// Taken from https://github.com/jaredhanson/passport-local/blob/master/lib/passport-local/index.js

/**
 * Module dependencies.
 */
var Strategy = require('./strategy')
  , BadRequestError = require('./errors/badrequesterror');


/**
 * Framework version.
 */
require('pkginfo')(module, 'version');

/**
 * Expose constructors.
 */
exports.Strategy = Strategy;

exports.BadRequestError = BadRequestError;