// Configure Passport library to use Passport-JWT
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const config = require("../../config");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.auth.jwtSecret
    },
    async (jwtPayload, done) => {
      // Verify token validity
      try {
        // Retrieve User and check real User.ID with User.ID within uncrypted JWT payload
        const user = await User.findById(jwtPayload._id);
        // We found a valid user
        if (user) {
          return done(null, user);
        }
        return done(new Error(), false);
      } catch (err) {
        return done(new Error(), false);
      }
    }
  )
);
