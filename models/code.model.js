const mongoose = require("mongoose");
const moment = require("moment")
const crs = require('crypto-random-string');

const CodeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, /* A unique indicator                         */
  title: { type: String, required: true },            /* Title for the code snippet                 */
  description: { type: String, required: true },      /* Brief Description                          */
  lang: { type: String, required: true },             /* Programming language                       */
  type: { type: String },                             /* Indicates if it's a class, function, etc.  */
  user: { type: String, required: true },             /* User who created the snippet               */
  likes: { type: Number },                            /* How often this code snippet was starred    */
  value: { type: String, required: true },            /* The actual code                            */
  createdAt: { type: Date },                          
  updatedAt: { type: Date }
});

// Virtual methods
CodeSchema.virtual('codeLength').get(() => this.code.length);

// Pre hooks
CodeSchema.pre('save', (next) => {
  const now = moment();

  if (!this.id) this.id = crs({ length: 25, type: 'url-safe' });
  if (!this.createdAt) this.createdAt = now;
  this.updatedAt = now;
  next();
})

module.exports = CodeSchema;