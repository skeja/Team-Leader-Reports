const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const { user } = require('../models');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY
};

const jwtStrategy = new JwtStrategy(opts, (payload, next) => {
  user.findOne({ where: { id: payload.id } })
    .then(res => next(null, res));
});

passport.use(jwtStrategy);

module.exports = passport;
