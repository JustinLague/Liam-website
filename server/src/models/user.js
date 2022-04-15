const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

// Encrypt password before save
UserSchema.pre("save", function () {
  const user = this;

  if (!user.isModified("password")) return;

  // Hash/Salt password
  const saltRounds = 15;
  const hash = bcrypt.hashSync(user.password, saltRounds);
  user.password = hash;
});

// Compare hashed password
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
