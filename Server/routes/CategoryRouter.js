var express = require('express');
var multer = require('multer')

var mongoose = require('mongoose')
const sharp = require('sharp')

var CategoryRouter = express.Router();

CategoryRouter.use(express.json())

var Categories = require('../model/CategorySchema');
const { ObjectID } = require('mongodb');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }

})

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
}


const upload = multer({ storage: storage, fileFilter: imageFileFilter });

CategoryRouter.route('/')
    .get((req, res, next) => {
        Categories.find({})
            .then((result) => {

                res.statusCode = 200;
                res.setHeader('ContentType', 'application/json')
                res.json(result)
            }, (err) => console.log(err))
            .catch((err) => {
                return next(err)
            })
    })
    .post((req, res, next) => {
        Categories.create({
            Category: req.body.Category,
            CategoryDiscription: req.body.CategoryDiscription
        }).then((result) => {

            console.log(result);
            res.statusCode = 200;
            res.setHeader('ContentType', 'application/json')
            res.json(result)
        }).catch((err) => {
            console.log(err)
        })



    })
    .put((req, res, next) => {
        res.send("Put request is not allowed on this router");
    })
    .delete((req, res, next) => {
        res.send("delete request on Category Router")

    })

CategoryRouter.route('/:catId')
    .get((req, res, next) => {
        res.statusCode = 400
        res.send("Get request is not supported");
    })
    .post((req, res, next) => {
        res.statusCode = 400

        res.send("Post request is not supported");
    })
    .put((req, res, next) => {

        Categories.findByIdAndUpdate(req.params.catId, {
            $set: req.body
        }).then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {

        Categories.findByIdAndRemove(req.params.catId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

CategoryRouter.route('/:catId/products')
    .get((req, res, next) => {
        Categories.findById(req.params.catId)
            .then((result) => {
                console.log(result)
                res.send(result)

            })
            .catch((err) => next(err))
    })
    .post(upload.array('mainImage', 5), async (req, res, next) => {
        console.log(req.files)
        Categories.findById(req.params.catId)
            .then(async (results) => {

                /*let fileArray = []
                for (let i = 0; i < req.files.length; i++) {
                    fileArray.push(sharp(req.files[i].buffer).resize({ width: 500, height: 500 }))
                }*/

                /* var obj = {
                     _id: new ObjectID,
                     Category: req.body.Category,
                     productName: req.body.productName,
                     productDiscription: req.body.productDiscription,
                     productPrice: req.body.productPrice,
                     gst: req.body.gst,
                     stock: req.body.stock,
                     mainImage: req.files,
                     //imgData: req.body.imgData
                 }
         
         
                 results.Products.push(obj)
         
                 results.save()
                     .then((result) => {
                         res.statusCode = 200;
                         res.setHeader('Content-Type', 'application/json');
                         res.json(result);
                     })
                     .catch((err) => next(err))*/
            })
            .catch((err) => next(err))
    })
    .put((req, res, next) => {
        res.send("This put request on /products is not supported")
    })
    .delete((req, res, next) => {
        res.send("This is delete request on Products")

    })

CategoryRouter.route('/:catId/products/:proId')
    .get((req, res, next) => {
        Categories.findById(req.params.catId)
            .then((result) => {
                console.log(result)
                res.send(result)

            })
            .catch((err) => next(err))
    })
    .put((req, res, next) => {
        Categories.findById(req.params.catId)
            .then((result) => {
                if (result !== null) {
                    if (result.Products.id(req.params.proId)) {
                        result.Products.id(req.params.proId).productName = req.body.productName
                        result.Products.id(req.params.proId).productPrice = req.body.productPrice
                        result.Products.id(req.params.proId).productDiscription = req.body.productDiscription
                        result.Products.id(req.params.proId).stock = req.body.stock
                        result.Products.id(req.params.proId).gst = req.body.gst
                        result.Products.id(req.params.proId).imgData = req.body.imgData
                    }
                    result.save()
                        .then((result) => {
                            res.json(result);
                        })
                        .catch((err) => next(err))
                }
                res.json(result);
            }, (err) => next(err))
            .catch((err) => next(err));

    })


module.exports = CategoryRouter