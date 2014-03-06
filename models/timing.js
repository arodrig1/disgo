var Timing = function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        _ObjectId = mongoose.Types.ObjectId;
    
    var TimingSchema = new Schema({
        experiment: { type: String},
        testSet: { type: String},
        duration: { type: Number}
    });

    var _create = function(experiment, testSet, duration, callback) {
        _model.create({
                'experiment': experiment,
                'testSet': testSet,
                'duration': duration
            }, callback);
    };

    var _model = mongoose.model('Timing', TimingSchema);

    return {
        schema: TimingSchema,
        model: _model,
        create: _create
    };
}();

module.exports = Timing;
