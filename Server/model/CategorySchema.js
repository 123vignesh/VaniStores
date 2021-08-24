var mongoose = require('mongoose');

var Schema = mongoose.Schema

var ProductSchema = new Schema({

    productName: {
        type: String,
    },
    productCaption: {
        type: String
    },
    subCategory: {
        type: String,
        default: "General"
    },
    productDiscription: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    gst: {
        type: String,

    },
    imgData: {
        type: String
    },
    mainImage:
    {
        type: Array
    }

}, {
    timestamps: true
})



var CategorySchema = new Schema({
    Category: {
        type: String,
        required: true,
        unique: true

    },
    CategoryDiscription: {
        type: String,

    },
    Products: [ProductSchema]

}, {
    timestamps: true
})

var Categories = mongoose.model('Category', CategorySchema);

module.exports = Categories;