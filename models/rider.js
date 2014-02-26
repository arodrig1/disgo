var Rider = function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        _ObjectId = mongoose.Types.ObjectId,
        Ride = require('./ride.js');
    
    var RiderSchema = new Schema({
        name: { type: String, required: true },
        username: { type: String, required: true },
        rides: [{ type: _ObjectId, ref: 'Ride' }]
    });

    var _model = mongoose.model('Rider', RiderSchema);

    var _findById = function (riderId, callback) {
        _model.findById(new _ObjectId(riderId)).populate('name username rides').exec(callback);
    }

    var _findByUsername = function (riderUsername, callback) {
        _model.find({ username: riderUsername }).populate('name username rides').exec(callback);
    }

    var _findAll = function(callback) {
        _model.find().populate('name username rides').exec(callback);
    }

    var _save = function (riderJSON, callback) {
        _model.create(riderJSON, callback);
    }

    return {
        schema: RiderSchema,
        model: _model,
        findById: _findById,
        findAll: _findAll,
        findByUsername: _findByUsername,
        save: _save
    };
}();

module.exports = Rider;
