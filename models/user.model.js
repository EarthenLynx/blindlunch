const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: {type: String, required: true, unique: true},
  roles: { type: Array, required: true },
  registered: { type: Date },
  lastLogin: { type: Date }
});

module.exports = mongoose.model('UserSchema', UserSchema);