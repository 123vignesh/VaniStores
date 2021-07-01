var mongoose = require('mongoose')

var Schema = mongoose.Schema

var CartSchema = new Schema({
    productImage: {
        type: String
    },
    productName: {
        type: String
    },
    productPrice: {
        type: String
    },
    productStock: {
        type: Number
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    AddedToCart: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

var Carts = mongoose.model('Cart', CartSchema);

module.exports = Carts;