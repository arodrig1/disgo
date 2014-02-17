var Coordinator = function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        _ObjectId = mongoose.Types.ObjectId;
    
    var CoordinatorSchema = new Schema({
        id: { type: Number, required: true },
        name: { type: String, required: true },
        username: { type: String, required: true }
    });

    var _model = mongoose.model('Coordinator', CoordinatorSchema);


    return {
        schema: CoordinatorSchema
    };
}();

module.exports = Coordinator;
