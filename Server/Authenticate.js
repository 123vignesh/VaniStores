var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt
var jwt = require('jsonwebtoken')


var config = require('./config');
var User = require('./model/User');
require('dotenv').config();

exports.local = passport.use(new localStrategy({ usernameField: "email", passwordField: "password" }, User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey,
        { expiresIn: 36000 }
    )
};



exports.jwtPassport = passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secretKey
},
    (jwt_payload, done) => {
        console.log("Jwt Payload" + jwt_payload);
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false)
            } else if (user) {
                return done(null, user)
            } else {
                return done(null, false);
            }
        })
    }
))


exports.verifyUser = passport.authenticate('jwt', { session: false });


exports.verifyAdmin = function (req, res, next) {

    if (req.user.admin) {
        next();
    } else {
        var err = new Error('Only Admins are authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
}