const mongoose = require("mongoose");
const crs = require('crypto-random-string');

const RolesSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  key: {type: String, required: true, unique: true},
});

// Pre hooks
RolesSchema.pre('save', (next) => {
  if (!this.id) this.id = crs({ length: 25, type: 'url-safe' });
  if (!this.key) this.key = crs({ length: 40, type: 'base64' });
  next();
})

module.exports = RolesSchema;