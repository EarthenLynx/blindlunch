const RolesSchema = require('../models/roles.model');
const crs = require('crypto-random-string');

// Controller Owners: Admin

const handleCreateRole = (req, res) => {
  // Check if body is non - empty
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.status(400).send({ status: 'client-error', msg: 'The request did not contain the necessary parameters' })
  }
  // If body exists, extract its content and build the role
  else {
    const { name } = req.body;
    const id = crs({ length: 25, type: 'url-safe' });
    const key = crs({ length: 40, type: 'base64' });

    const role = new RolesSchema({ name, id, key })

    role.save((err, doc) => {
      if (err) {
        res.status(500).send({ status: 'server-error', msg: 'Could not save role to database', err })
      } else {
        res.status(200).send({ status: 'success', msg: 'Role successfully saved to database', doc })
      }
    });
  }
}

const handleGetRoleList = (req, res) => {
  RolesSchema.find({}, (err, doc) => {
    if (err) {
      res.status(500).send({ status: 'server-error', msg: 'Could not fetch roles from database', err })
    } else if (doc === null) {
      res.status(404).send({ status: 'not-found', msg: 'No roles found.', err })
    } else {
      res.status(200).send({ status: 'success', msg: `Fetched ${doc.length} roles from database`, doc })
    }
  })
}

const handleDeleteRoleById = (req, res) => {
  // Check if a parameter is passed
  if (!req.query.id) {
    res.status(400).send({ status: 'client-error', msg: 'The request URL did not contain the necessary parameters: id' })
  } else {
    const id = req.query.id;
    const role = RolesSchema

    // Check if the role exists in database
    role.findById({ _id: id }, (err, doc) => {
      if (err || !doc) {
        res.status(500).send({ status: 'server-error', msg: 'Could not find the role to delete in database', err })
      }

      // If the role exists, delete it
      else {
        role.findByIdAndRemove({ _id: doc._id }, (err, doc) => {
          if (err) {
            res.status(500).send({ status: 'server-error', msg: 'Could not delete role from database', err })
          } else {
            res.status(200).send({ status: 'success', msg: 'Role successfully deleted from database', doc })
          }
        });
      }
    });
  }
}

module.exports = { handleCreateRole, handleGetRoleList, handleDeleteRoleById }