const mongoose = require("mongoose");

const CodeLanguageSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('CodeLanguageSchema', CodeLanguageSchema);