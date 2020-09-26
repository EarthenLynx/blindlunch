const mongoose = require("mongoose");

const RolesSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true },
  key: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('RolesSchema', RolesSchema);