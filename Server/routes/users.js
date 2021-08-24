var express = require('express');
var router = express.Router();
var User = require('../model/User')
var authenticate = require('../Authenticate')
var jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer');
router.use(express.json())

var passport = require('passport')

/* GET users listing. */

let JWT_SECRET = "shruthi@127"

router.get('/', function (req, res, next) {
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




router.post('/forgotpassword', (req, res) => {
  User.find({ email: req.body.email })
    .then((result) => {

      if (result) {
        const secret = JWT_SECRET + result.password;
        const payload = {
          email: result.email,
          id: result[0]._id
        }
        const token = jwt.sign(payload, secret, { expiresIn: '15m' })

        const link = `http://localhost:3000/resetpassword/${result[0]._id}/${token}`

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'vigneshmsmg2000@gmail.com',
            pass: 'surviva@1279'
          }
        });
        var mailOptions = {
          from: 'vigneshmsmg2000@gmail.com',
          to: 'vigneshmsmg2000@gmail.com',
          subject: 'Link to reset password',
          html: `<h1>Click on this link to Reset your password</h1><p>${link}</p>`
        }

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ message: "Link has been sent to your registered email" });

          }
        });




      } else {
        res.json("User Doesn't excist")
      }


    }).catch((err) => {
      return next(err)
    })
})



router.post('/reset-password/:id/:token', (req, res) => {

  let originalString = req.params.id
  let Id = originalString.replace(':', '');
  if (req.params.token) {
    User.findById(Id)
      .then(function (sanitizedUser) {
        if (sanitizedUser) {
          sanitizedUser.setPassword(req.body.confirmPassword, function () {
            sanitizedUser.save();
            res.status(200).json({ message: 'password reset successful' });
          });
        } else {
          res.status(500).json({ message: 'This user does not exist' });
        }
      }).catch((err) => {
        console.error(err);
      })

  } else {
    res.statusCode = 404;
    console.log("Error of Expiration");
  }



})
module.exports = router;
