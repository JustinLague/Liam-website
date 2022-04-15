const passport = require("passport");

class AuthPolicies {
  /**
   * Middleware that checks if JWT token of the user is valid calling next()
   */
  verifyToken(req, res, next) {
    passport.authenticate("jwt", (err, user) => {
      if (err || !user) {
        res.status(403).send({
          error: "Access denied. Please login."
        });
      } else {
        // Inject the authentic user in request object
        req.user = user;
        next();
      }
    })(req, res, next);
  }
}

module.exports = new AuthPolicies();
