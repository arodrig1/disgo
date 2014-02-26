var hash = require('../hash');
var Crypto = require('crypto');
var Ride = require('../models/ride.js');

var User = function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        _ObjectId = mongoose.Types.ObjectId;
    
    var UserSchema = new Schema({
        type: { type: Number, required: true },//0 = driver, 1 = rider, 2 = coordinator
        username: { type: String, required: true, unique: true },
        //userId: { type: Number, required: true }, //the id of the specific user within that table (may not need)
        salt: { type: String},
        hash: { type: String},
        name: { type: String},
        rides: [{ type: _ObjectId, ref: 'Ride' }]
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
                if(err) throw err;
                _model.create({
                        'username' : username,
                        'salt' : Buffer(salt, 'binary').toString('base64'),
                        'hash' : Buffer(hash, 'binary').toString('base64'),
                        'type' : type
                    }, function(err, user) {
                        if(err) {throw err;}
                        done(null, user);
                    });
        });
    };

    var _validatePassword = function(username, password, done) {
    //var _validatePassword = function(username, password, callbackFn) {
        _model.findOne({'username' : username}, function(err, user){
            if(err) return done(err);
            if(!user) return done(null, false, { message : 'Incorrect username.' });
            hash(password, Buffer(user.salt, 'base64'), function(err, hash){
                if(err) return done(err);
                hash = Buffer(hash, 'binary').toString('base64');
                if(hash == user.hash) return done(null, user);
                else return done(null, false, { message : 'Incorrect password' });
            });
            /*if (err) return callbackFn({ success: false, message: err });
            if (!user) return callbackFn({ success: false, message : 'Incorrect username.' });
            hash(password, Buffer(user.salt, 'base64'), function(err, hash) {
                if (err) return callbackFn({ success: false, message: err });
                hash = Buffer(hash, 'binary').toString('base64');
                if(hash == user.hash) return callbackFn({ success: true, message: null });
                else return callbackFn({ success: false, message: 'Incorrect password' });
            });*/
        });
    };

    var _saveRide = function (user, rideJSON, callback) {
        Ride.save(rideJSON, function(err, riderDocs) {
            if(err) {
                console.log(err);
                throw err;
            }
            console.log(riderDocs);
            _model.update({_id: user.id}, {$push: { rides: riderDocs }},{upsert:true}, callback);
        });
    }

    var _model = mongoose.model('User', UserSchema);

    return {
        schema: UserSchema,
        model: _model,
        findById: _findById,
        findByUsername: _findByUsername,
        findOne: _findOne,
        create: _create,
        validatePassword: _validatePassword,
        saveRide: _saveRide
    };
}();

module.exports = User;
