const crs = require('crypto-random-string');
const moment = require('moment');
const CodeSchema = require('../models/code.model');
const UserSchema = require('../models/user.model');

const handleCreateCode = (req, res, payload) => {
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.status(400).send({ status: 'client-error', msg: 'The request did not contain a body.' })
  }

  // If no payload is passed, throw an error
  else if (!payload) {
    throw new Error('Did not receive a payload in handleCreateCode')
  }

  // If body is non - empty, continue
  else {
    // Extract the necessary variables from the payload and request objects
    const { aud, id } = payload;
    const user = { username: aud, userId: id }
    const { title, description, lang, type, value } = req.body;

    // Create an ID for the code 
    const codeId = crs({ length: 25, type: 'base64' });

    // Create the code schema object 
    const code = new CodeSchema({ id: codeId, title, description, lang, type, user, likes: 0, value, createdAt: moment(), updatedAt: moment() });

    code.save((err, doc) => {
      if (err) {
        res.status(500).send({ status: 'server-error', msg: 'Could not connect to database', err });
      } else {
        res.status(201).send({ status: 'success', msg: `Code with title ${doc.title} successfully saved to database` });
      }
    })
  }

}

module.exports = { handleCreateCode }