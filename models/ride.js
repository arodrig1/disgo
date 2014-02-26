var Ride = function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        _ObjectId = mongoose.Types.ObjectId,
        Driver = require('./driver.js'),
        Rider = require('./rider.js');

    var RideSchema = new Schema({
        from: { type: String, required: true },
        to: { type: String, required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true },
        //driver: { type: _ObjectId, ref: 'Driver' },
        //rider: { type: _ObjectId, ref: 'Rider' },
        username: {type: String},

    });

    var _model = mongoose.model('Ride', RideSchema);

    var _save = function (rideJSON, callback) {
        _model.create(rideJSON, callback);
    }

    var _findByUsername = function (userUsername, callback) {
        _model.find({ username: userUsername }).sort({ date: 'asc' }).sort({ time: 'asc' }).exec(callback);
    }

    return {
        schema: RideSchema,
        save: _save,
        findByUsername: _findByUsername
    };
}();

module.exports = Ride;
