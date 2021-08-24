var mongoose = require('mongoose')

var Schema = mongoose.Schema

var AddressSchema = new Schema({
    state: {
        type: String
    },

    city: {
        type: String
    },
    area: {
        type: String
    },
    pinCode: {
        type: String
    },
    email: {
        type: String
    }
}, {
    timestamps: true
});

var Address = mongoose.model('Address', AddressSchema);

module.exports = Address

