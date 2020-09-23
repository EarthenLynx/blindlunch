const mongoose = require("mongoose");
const moment = require("moment")
const crs = require('crypto-random-string');

const CodeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  lang: { type: String, required: true },
  value: { type: String, required: true },
  user: { type: String, required: true },
  likes: { type: Number },
  createdAt: { type: Date },
  updatedAt: { type: Date }
});

// Virtual methods
CodeSchema.virtual('codeLength').get(() => this.code.length);

// Pre hooks
CodeSchema.pre('save', (next) => {
  const now = moment();

  if(!this.id) this.id = crs({length: 25, type: 'url-safe'});
  if (!this.createdAt) this.createdAt = now;
  this.updatedAt = now;
  next();
})

module.exports = CodeSchema;