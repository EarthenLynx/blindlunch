const mongoose = require("mongoose");

const Codetype = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Codetype', Codetype);