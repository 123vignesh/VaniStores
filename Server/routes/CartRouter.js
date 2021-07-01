var express = require('express');

var CartRouter = express.Router();

CartRouter.use(express.json())

var Carts = require('../model/CartSchema')

const authenticate = require('../Authenticate')

CartRouter.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        if (!req.user.admin) {
            Carts.find({})
                .populate('Carts.author')
                .then((result) => {
                    console.log(result.length)

                    if (result.length > 0) {
                        let array = []
                        for (let i = 0; i < result.length; i++) {

                            if (String(result[i].author) === String(req.user._id)) {

                                array.push(result[i]);

                            }

                        }

                        res.setHeader('Content-Type', 'application/json')
                        res.statusCode = 200
                        res.json(array)

                    } else {
                        res.setHeader('Content-Type', 'application/json')
                        res.statusCode = 200
                        res.json([])
                    }


                }).catch((error) => {
                    return next(error)
                })
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 401
            res.json("Admins cannot access cart")
        }


    })
    .post(authenticate.verifyUser, (req, res, next) => {

        Carts.findOne({ productName: req.body.productName, author: req.user._id })
            .then((result) => {

                if (result === null) {
                    req.body.author = req.user._id;
                    Carts.create(req.body)
                        .then((result) => {
                            Carts.find({})
                                .populate('Carts.author')
                                .then((result) => {
                                    res.json(result)
                                }).catch((err) => {
                                    console.log(err)
                                })

                        }).catch((error) => {
                            return next(error)
                        })
                } else {
                    res.statusCode = 400;
                    res.json("This Product alredy exist in your cart")
                }

            }).catch((err) => {
                return next(err)
            })


    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.send("Put router of Cart")
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Carts.deleteMany({}).then((result) => {
            res.json(result)
        }).catch((err) => {
            return next(err)
        })
    })

CartRouter.route('/:cartId')
    .get(authenticate.verifyUser, (req, res, next) => {
        res.send("Get request is not supported")
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        res.send("Post request is not supported")
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.send("put supported")
    })
    .delete(authenticate.verifyUser, (req, res, next) => {

        Carts.findByIdAndRemove(req.params.cartId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

module.exports = CartRouter