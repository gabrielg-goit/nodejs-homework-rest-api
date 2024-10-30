const passportJWT = require("passport-jwt");
const passport = require("passport");
const User = require("../services/schemas/User");

require("dotenv").config();

const secret = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.find({ email: payload.email })
      .then(([user]) => {
        if (!user) {
          return done(new Error("User-ul nu exista!"));
        }
        return done(null, user);
      })
      .catch((error) => done(error));
  })
);
