var hash = require('../hash');
var Crypto = require('crypto');

var User = function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        _ObjectId = mongoose.Types.ObjectId;
    
    var UserSchema = new Schema({
        type: { type: Number, required: true },//0 = driver, 1 = rider, 2 = coordinator
        username: { type: String, required: true, unique: true },
        //userId: { type: Number, required: true }, //the id of the specific user within that table (may not need)
        salt: { type: String},
        hash: { type: String}
    });

    var _findById = function(id, callback) {
        _model.findById(id).exec(callback);
    }

    var _findByUsername = function (userUsername, callback) {
        _model.find({ username: userUsername }).exec(callback);
    }

    var _findOne = function(username, done, callback) {
        _model.findOne({ username: username }).exec(callback);
    };

    var _create = function(username, password, type, done){
        try {
            var salt = Crypto.randomBytes(256);
        } catch (ex) {
            console.log(ex);
        }
        hash(password, salt, function(err, hash) {
                //console.log(username);
                //console.log("CREATED SALT: " + Buffer(salt, 'binary').toString('base64'));
                //console.log("CREATED HASH: " + Buffer(hash, 'binary').toString('base64'));
                if(err) throw err;
                console.log("creating the user now");
                _model.create({
                        'username' : username,
                        'salt' : Buffer(salt, 'binary').toString('base64'),
                        'hash' : Buffer(hash, 'binary').toString('base64'),
                        'type' : type
                    }, function(err, user) {
                        if(err) throw err;
                        done(null, user);
                    });
        });
    };

    var _validatePassword = function(username, password, done) {
        _model.findOne({'username' : username}, function(err, user){
            if(err) return done(err);
            if(!user) return done(null, false, { message : 'Incorrect username.' });
            //console.log("RETRIEVED SALT: " + user.salt);
            hash(password, Buffer(user.salt, 'base64'), function(err, hash){
                if(err) return done(err);
                hash = Buffer(hash, 'binary').toString('base64');
                //console.log("RETRIEVED HASH: " + user.hash);
                //console.log("CALCULATED HASH: " + hash);                
                if(hash == user.hash) return done(null, user);
                done(null, false, {
                    message : 'Incorrect password'
                });
            });
        });
    };

    var _model = mongoose.model('User', UserSchema);

    return {
        schema: UserSchema,
        model: _model,
        findById: _findById,
        findByUsername: _findByUsername,
        findOne: _findOne,
        create: _create,
        validatePassword: _validatePassword
    };
}();

module.exports = User;
