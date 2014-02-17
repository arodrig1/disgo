var Driver = function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        _ObjectId = mongoose.Types.ObjectId;
    
    var DriverSchema = new Schema({
        id: { type: Number, required: true },
        name: { type: String, required: true },
        username: { type: String, required: true }
    });

    var _model = mongoose.model('Driver', DriverSchema);


    return {
        schema: DriverSchema
    };
}();

module.exports = Driver;
