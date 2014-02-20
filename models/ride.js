var Ride = function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        _ObjectId = mongoose.Types.ObjectId;
    
    var RideSchema = new Schema({
        id: { type: Number, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true }
    });

    var _model = mongoose.model('Ride', RideSchema);

    return {
        schema: RideSchema
    };
}();

module.exports = Ride;
