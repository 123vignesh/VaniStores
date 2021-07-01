var mongoose = require('mongoose')

var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')


var UserSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    mobileNumber: {
        type: Number
    },
    password: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
var User = mongoose.model('User', UserSchema);

module.exports = User

