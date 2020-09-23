const mongoose = require("mongoose");
const moment = require("moment")
const crs = require('crypto-random-string');

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: {type: String, required: true, unique: true},
  roles: { type: Array, required: true },
  codeIds: { type: Array },
  registered: { type: Date },
  lastLogin: { type: Date }
});

// Pre hooks
UserSchema.pre('save', (next) => {
  const now = moment();

  if (!this.id) this.id = crs({ length: 25, type: 'url-safe' });
  if (!this.registered) this.registered = now;
  this.lastLogin = now;
  next();
})

module.exports = UserSchema;