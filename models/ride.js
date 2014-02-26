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
        driverUsername: {type: String},
        riderUsername: {type: String, required: true},
        driver: {type: String},
        rider: {type: String, required: true}
    });

    var _model = mongoose.model('Ride', RideSchema);

    var _save = function (rideJSON, callback) {
        //ASSIGN DRIVER AND DRIVER USERNAME
        _model.create(rideJSON, callback);
    }

    var _findByDriverUsername = function (driver, callback) {
        _model.find({ driverUsername: driver }).sort({ date: 'asc' }).sort({ time: 'asc' }).exec(callback);
    }

    var _findByRiderUsername = function (rider, callback) {
        _model.find({ riderUsername: rider }).sort({ date: 'asc' }).sort({ time: 'asc' }).exec(callback);
    }

    return {
        schema: RideSchema,
        save: _save,
        findByDriverUsername: _findByDriverUsername,
        findByRiderUsername: _findByRiderUsername
    };
}();

module.exports = Ride;
