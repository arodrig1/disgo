var User = function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        _ObjectId = mongoose.Types.ObjectId;
    
    var UserSchema = new Schema({
        id: { type: Number, required: true, unique: true },
        type: { type: Number, required: true },//0 = driver, 1 = rider, 2 = coordinator
        username: { type: String, required: true, unique: true },
        userId: { type: Number, required: true }, //the id of the specific user within that table (may not need)
        salt: String,
        hash: String
    });

    UserSchema.statics.findOne = function(username) {
        this.findOne({ username: username}, function(err, user) {
            if (err) return err;
            return user;
        })
    }

    UserSchema.statics.signup = function(username, password, done){
        var User = this;
        hash(password, function(err, salt, hash){
            if(err) throw err;
            // if (err) return done(err);
            User.create({
                username : username,
                salt : salt,
                hash : hash
            }, function(err, user){
                if(err) throw err;
                done(null, user);
            });
        });
    };

    UserSchema.statics.isValidUserPassword = function(username, password, done) {
        this.findOne({username : username}, function(err, user){
            // if(err) throw err;
            console.log(err);
            if(err) return done(err);
            console.log("IsValidPass called!");
            if(!user) return done(null, false, { message : 'Incorrect username.' });
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
