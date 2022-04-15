const jwt = require("jsonwebtoken");
const config = require("../../config");
const User = require("../models/user");

function generateJWT(user) {
  const oneWeek = 60 * 60 * 24 * 7;
  return jwt.sign(user.toJSON(), config.auth.jwtSecret, { expiresIn: oneWeek });
}

class AuthController {
  async register(req, res) {
    try {
      const { username, password } = req.body;

      let user = new User({
        username,
        password
      });
      
      user = await user.save();

      res.send({
        username: user.username,
        token: generateJWT(user)
      });
    } catch (err) {
      console.err(err);
      res.status(400).send({ error: "Le nom d'utilisateur existe déjà." });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;
    try {
      // check username
      let user = await User.findOne({ username }).populate("queries");
      if (!user) {
        return res.status(403).send({ error: "Le nom d'utilisateur ou le mot de passe ne sont pas valide." });
      }
      // Check password
      const validPassword = user.comparePassword(password);
      if (!validPassword) {
        return res.status(403).send({ error: "Le nom d'utilisateur ou le mot de passe ne sont pas valide." });
      }

      // User is valid, connect and generate token
      res.send({
        username: user.username,
        token: generateJWT(user)
      });
    } catch (err) {
      res.status(500).send({
        error: "An internal error has occured"
      });
    }
  }
}

module.exports = new AuthController();
