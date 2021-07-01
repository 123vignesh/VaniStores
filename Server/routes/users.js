var express = require('express');
var router = express.Router();
var User = require('../model/User')
var authenticate = require('../Authenticate')

router.use(express.json())

var passport = require('passport')

/* GET users listing. */
router.get('/signup', function (req, res, next) {
  User.find({}).then((result) => {
    res.json(result)
  }).catch((err) => {
    return next(err)
  })
});

router.post('/signup', (req, res, next) => {

  let Users = new User({ email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, mobileNumber: req.body.mobileNumber });

  User.register(Users, req.body.password, (err, user) => {
    if (err) {

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err })

    }

    else {

      passport.authenticate('local')(req, res, () => {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, status: 'Registration Successful!' });
      })
    }
  })

});

router.post('/login', passport.authenticate('local'), (req, res) => {

  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, token: token, status: 'You are Successful logged in', isAdmin: req.user.admin });

})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

router.delete('/signup', function (req, res, next) {
  User.deleteMany({}).then((result) => {
    res.json(result)
  }).catch((err) => {
    return next(err)
  })
});

module.exports = router;
