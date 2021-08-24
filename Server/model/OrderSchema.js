var mongoose = require('mongoose')

var Schema = mongoose.Schema


var OrderSchema = new Schema({
    orderId: {
        type: String
    },
    paymentId: {
        type: String
    },
    paymentDate: {
        type: String
    },
    productName: {
        type: String
    },
    DeliveryStatus: {
        type: String,
        default: "Processing"
    },
    city: {
        type: String
    },
    pinCode: {
        type: String
    },
}, {
    timestamps: true
})


var Orders = mongoose.model('Order', OrderSchema);

module.exports = Orders