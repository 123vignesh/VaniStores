var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var passport = require('passport')
var authenticate = require('./Authenticate')


//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var CategoryRouter = require('./routes/CategoryRouter')
var CartRouter = require('./routes/CartRouter')
var app = express();
var cors = require('cors');
const paymentRouter = require('./routes/PaymentRouter');
const OrderRouter = require('./routes/OrderRouter');


const url = 'mongodb://localhost:27017/';
const dbname = "VaniStores";

const connect = mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

connect.then((db) => {
  console.log('Connected correctly to Mongo server');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname + '/public/images')))
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors())



app.use(passport.initialize());


app.use('/users', usersRouter);





//app.use('/', indexRouter);
app.use('/category', CategoryRouter);
app.use('/cart', CartRouter);
app.use('/api', paymentRouter);
app.use('/order', OrderRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next()
  //next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
