var Rider = function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        _ObjectId = mongoose.Types.ObjectId;
    
    var RiderSchema = new Schema({
        id: { type: Number, required: true },
        name: { type: String, required: true },
        username: { type: String, required: true }
    });

    var _model = mongoose.model('Rider', RiderSchema);


    return {
        schema: RiderSchema
    };
}();

module.exports = Rider;
