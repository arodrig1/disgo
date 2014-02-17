var User = function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        _ObjectId = mongoose.Types.ObjectId;
    
    var UserSchema = new Schema({
        id: { type: Number, required: true },
        type: { type: Number, required: true },//0 = driver, 1 = rider, 2 = coordinator
        username: { type: String, required: true },
        userId: { type: Number, required: true }, //the id of the specific user within that table (may not need)
        salt: String,
        hash: String
    });

    UserSchema.statics.signup = function(email, password, done){
        var User = this;
        hash(password, function(err, salt, hash){
            if(err) throw err;
            // if (err) return done(err);
            User.create({
                email : email,
                salt : salt,
                hash : hash
            }, function(err, user){
                if(err) throw err;
                // if (err) return done(err);
                done(null, user);
            });
        });
    };

    UserSchema.statics.isValidUserPassword = function(email, password, done) {
        this.findOne({email : email}, function(err, user){
            // if(err) throw err;
            if(err) return done(err);
            if(!user) return done(null, false, { message : 'Incorrect email.' });
            hash(password, user.salt, function(err, hash){
                if(err) return done(err);
                if(hash == user.hash) return done(null, user);
                done(null, false, {
                    message : 'Incorrect password'
                });
            });
        });
    };

    var _model = mongoose.model('User', UserSchema);

    return {
        schema: UserSchema
    };
}();

module.exports = User;
