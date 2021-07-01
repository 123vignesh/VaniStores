require('dotenv').config()
var express = require('express')
var uniqId = require('uniqid')
var paymentRouter = express.Router()

paymentRouter.use(express.json());

const Razorpay = require('razorpay')

const authenticate = require('../Authenticate')


var instance = new Razorpay(
    {
        key_id: process.env.KEY_ID,
        key_secret: process.env.SECRET_KEY
    })

paymentRouter.route('/createorder')
    .post(authenticate.verifyUser, (req, res, next) => {
        var options = {
            amount: parseInt(req.body.amount) * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: uniqId()
        };
        instance.orders.create(options, function (err, order) {
            if (err) {
                return next(err)
            }
            res.json(order)
        });
    })

    .put((req, res, next) => {
        res.send("put to payment");
    })
    .delete((req, res, next) => {
        res.send("Delete to payment");
    })


module.exports = paymentRouter;