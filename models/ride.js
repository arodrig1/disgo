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
        time: { type: String, required: true }//,
        //driver: { type: _ObjectId, ref: 'Driver' },
        //rider: { type: _ObjectId, ref: 'Rider' }
    });

    var _model = mongoose.model('Ride', RideSchema);

    var _findByUser = function(userId, don)

    return {
        schema: RideSchema,
        model: _model,

    };
}();

module.exports = Ride;
