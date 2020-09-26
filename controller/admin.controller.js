const crs = require('crypto-random-string');
const RolesSchema = require('../models/admin/roles.model');
const CodetypeSchema = require("../models/admin/codetype.model")
const CodelanguageSchema = require("../models/admin/codelanguage.model")

// Controller Owners: Admin
// Role Controls
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

    // Check if the role exists in database
    role.find({ id }, (err, doc) => {
      if (err || !doc) {
        res.status(500).send({ status: 'server-error', msg: 'Could not find the role to delete in database', err })
      }

      // If the role exists, delete it
      else {
        RolesSchema.findOneAndDelete({ id: doc.id }, (err, doc) => {
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

// Codetype Controls
const handleCreateCodetype = (req, res) => {
  // Check if body is non - empty
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.status(400).send({ status: 'client-error', msg: 'The request did not contain the necessary parameters' })
  }
  // If body exists, extract its content and build the role
  else {
    const { name } = req.body;
    const id = crs({ length: 25, type: 'url-safe' });

    const role = new CodetypeSchema({ name, id })

    role.save((err, doc) => {
      if (err) {
        res.status(500).send({ status: 'server-error', msg: 'Could not save role to database', err })
      } else {
        res.status(200).send({ status: 'success', msg: 'Codetype successfully saved to database', doc })
      }
    });
  }
}

const handleGetCodetypeList = (req, res) => {
  CodetypeSchema.find({}, (err, doc) => {
    if (err) {
      res.status(500).send({ status: 'server-error', msg: 'Could not fetch codetypes from database', err })
    } else if (doc === null) {
      res.status(404).send({ status: 'not-found', msg: 'No codetypes found.', err })
    } else {
      res.status(200).send({ status: 'success', msg: `Fetched ${doc.length} codetypes from database`, doc })
    }
  })
}

const handleDeleteCodetypeById = (req, res) => {
    // Check if a parameter is passed
    if (!req.query.id) {
      res.status(400).send({ status: 'client-error', msg: 'The request URL did not contain the necessary parameters: id' })
    } else {
      const id = req.query.id;
  
      // Check if the role exists in database
      CodetypeSchema.findOne({ id }, (err, doc) => {
        console.log(doc);
        if (err || !doc) {
          res.status(500).send({ status: 'server-error', msg: 'Could not find the codetype to delete in database', err })
        }
  
        // If the role exists, delete it
        else {
          CodetypeSchema.findOneAndDelete({ id: doc.id }, (err, doc) => {
            if (err) {
              res.status(500).send({ status: 'server-error', msg: 'Could not delete codetype from database', err })
            } else {
              res.status(200).send({ status: 'success', msg: 'Codetype successfully deleted from database', doc })
            }
          });
        }
      });
    }
}

// Code Language Controls

module.exports = { 
  handleCreateRole, 
  handleGetRoleList, 
  handleDeleteRoleById, 
  handleCreateCodetype, 
  handleGetCodetypeList, 
  handleDeleteCodetypeById 
}