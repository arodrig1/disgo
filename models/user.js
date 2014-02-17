var User = function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        _ObjectId = mongoose.Types.ObjectId;
    
    var UserSchema = new Schema({
        id: { type: Number, required: true },
        type: { type: Number, required: true },//0 = driver, 1 = rider, 2 = coordinator
        username: { type: String, required: true },
        userId: { type: Number, required: true }//the id of the specific user within that table (may not need)
    });

    var _model = mongoose.model('User', UserSchema);


    return {
        schema: UserSchema
    };
}();

module.exports = User;
