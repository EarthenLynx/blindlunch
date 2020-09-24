const RolesSchema = require('../models/roles.model');
const crs = require('crypto-random-string');

const handleCreateRole = (req, res) => {
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.status(400).send({ status: 'client-error', msg: 'The request did not contain the necessary parameters' })
  } else {

    const { name } = req.body;
    const id = crs({ length: 25, type: 'url-safe' });
    const key = crs({ length: 40, type: 'base64' });
    
    const role = new RolesSchema({ name, id, key })

    role.save((err, doc) => {
      if (err) {
        console.log(err);
        res.status(500).send({ status: 'server-error', msg: 'Could not save role to database', err })
      } else {
        res.status(200).send({ status: 'success', msg: 'Role successfully saved to database', doc })
      }
    });
  }


}

module.exports = { handleCreateRole }