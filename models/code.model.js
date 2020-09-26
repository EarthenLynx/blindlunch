const mongoose = require("mongoose");

const CodeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, /* A unique indicator                         */
  title: { type: String, required: true },            /* Title for the code snippet                 */
  description: { type: String, required: true },      /* Brief Description                          */
  lang: { type: String, required: true },             /* Programming language                       */
  type: { type: String, required: true },             /* Indicates if it's a class, function, etc.  */
  user: { 
    userId: { type: String, required: true }, 
    username: { type: String, required: true }
   },
  likes: { type: Number },                            /* How often this code snippet was starred    */
  value: { type: String, required: true },            /* The actual code                            */
  createdAt: { type: Date },                          
  updatedAt: { type: Date }
});

module.exports = mongoose.model('CodeSchema', CodeSchema);