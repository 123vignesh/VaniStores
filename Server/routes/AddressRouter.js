var express = require('express');


var AddressRouter = express.Router()

AddressRouter.use(express.json())

var Address = require('../model/AddressSchema')

AddressRouter.route('/')
    .get((req, res, next) => {

        Address.find({})
            .then((result) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result)
            })
            .catch((err) => {
                next(err)
                res.json(err.message)
            })
    })
    .post((req, res, next) => {

        Address.create(req.body)
            .then((result) => {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ Added: true })
            }).catch((error) => next(error))
    })
    .put((req, res, next) => {
        res.send("Put request on order")
    })
    .delete((req, res, next) => {
        res.send("Delete request on order")
    })




module.exports = AddressRouter