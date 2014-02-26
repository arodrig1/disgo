var Driver = function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        _ObjectId = mongoose.Types.ObjectId,
        Ride = require('./ride.js');
    
    var DriverSchema = new Schema({
        name: { type: String, required: true },
        username: { type: String, required: true },
        rides: [{ type: _ObjectId, ref: 'Ride' }]
    });

    var _model = mongoose.model('Driver', DriverSchema);

    var _findById = function (driverID, callback) {
        _model.findById(new _ObjectId(driverID)).populate('name username rides').exec(callback);
    }

    var _findByUsername = function (driverUsername, callback) {
        _model.find({ username: driverUsername }).populate('name username rides').exec(callback);
    }

    var _findAll = function(callback) {
        _model.find().populate('name username rides').exec(callback);
    }

    var _save = function (riderJSON, callback) {
        _model.create(riderJSON, callback);
    }

    return {
        schema: DriverSchema,
        model: _model,
        findById: _findById,
        findAll: _findAll,
        findByUsername: _findByUsername,
        save: _save
    };
}();

module.exports = Driver;
