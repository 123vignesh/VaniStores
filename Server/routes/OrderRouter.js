var express = require('express');


var OrderRouter = express.Router()

OrderRouter.use(express.json())

var Orders = require('../model/OrderSchema')
const authenticate = require('../Authenticate')
OrderRouter.route('/')
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

        Orders.find({}).then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result)
        }).catch((err) => next(err))
    })
    .post((req, res, next) => {

        Orders.create(req.body)
            .then((result) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result)
            }).catch((error) => next(error))
    })
    .put((req, res, next) => {
        res.send("Put request on order")
    })
    .delete((req, res, next) => {
        res.send("Delete request on order")
    })

OrderRouter.route('/:ordNoId')
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Orders.findByIdAndRemove(req.params.ordNoId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

        Orders.findByIdAndUpdate(req.params.ordNoId, {
            $set:
            {
                "DeliveryStatus": req.body.DeliveryStatus

            }
        })
            .then((result) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            }, (err) => next(err))
            .catch((err) => next(err));
    })


module.exports = OrderRouter