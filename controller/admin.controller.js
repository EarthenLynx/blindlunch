const crs = require('crypto-random-string');
const UserSchema = require("../models/user.model");
const RolesSchema = require('../models/admin/roles.model');
const AuthSchema = require("../models/auth.model");
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
    RolesSchema.find({ id }, (err, doc) => {
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
const handleCreateCodelanguage = (req, res) => {
  // Check if body is non - empty
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.status(400).send({ status: 'client-error', msg: 'The request did not contain the necessary parameters' })
  }
  // If body exists, extract its content and build the role
  else {
    const { name } = req.body;
    const id = crs({ length: 25, type: 'url-safe' });

    const role = new CodelanguageSchema({ name, id })

    role.save((err, doc) => {
      if (err) {
        res.status(500).send({ status: 'server-error', msg: 'Could not save role to database', err })
      } else {
        res.status(200).send({ status: 'success', msg: 'Codelanguage successfully saved to database', doc })
      }
    });
  }
}

const handleGetCodelanguageList = (req, res) => {
  CodelanguageSchema.find({}, (err, doc) => {
    if (err) {
      res.status(500).send({ status: 'server-error', msg: 'Could not fetch Codelanguages from database', err })
    } else if (doc === null) {
      res.status(404).send({ status: 'not-found', msg: 'No Codelanguages found.', err })
    } else {
      res.status(200).send({ status: 'success', msg: `Fetched ${doc.length} Codelanguages from database`, doc })
    }
  })
}

const handleDeleteCodelanguageById = (req, res) => {
  // Check if a parameter is passed
  if (!req.query.id) {
    res.status(400).send({ status: 'client-error', msg: 'The request URL did not contain the necessary parameters: id' })
  } else {
    const id = req.query.id;

    // Check if the role exists in database
    CodelanguageSchema.findOne({ id }, (err, doc) => {
      console.log(doc);
      if (err || !doc) {
        res.status(500).send({ status: 'server-error', msg: 'Could not find the Codelanguage to delete in database', err })
      }

      // If the role exists, delete it
      else {
        CodelanguageSchema.findOneAndDelete({ id: doc.id }, (err, doc) => {
          if (err) {
            res.status(500).send({ status: 'server-error', msg: 'Could not delete Codelanguage from database', err })
          } else {
            res.status(200).send({ status: 'success', msg: 'Codetype successfully deleted from database', doc })
          }
        });
      }
    });
  }
}

// User controls
const handleAddUserRole = (req, res) => {
  if (!req.query || !req.query.id) {
    res.status(400).send({ status: 'client-error', msg: 'The request URL did not contain the necessary parameters: id' })
  }
  // Check if body has been sent
  else if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.status(400).send({ status: 'client-error', msg: 'The request did not contain a body.' })
  }
  // Check if the body is properly formatted
  else if (!req.body.rolename) {
    res.status(400).send({ status: 'client-error', msg: 'The request did not contain the necessary params: rolename.' })
  }

  // If query and body are correctly available, continue
  else {
    // Extract the id from the query and the rolename from the body
    const id = req.query.id;
    const { rolename } = req.body;

    RolesSchema.findOne({ name: rolename }, (err, doc) => {
      if (err) { res.status(500).send({ status: 'server-error', msg: 'Could not connect to database', err }) }
      else if (!doc) { res.status(404).send({ status: 'not-found', msg: `The role you wanted to assign does not exist: ${rolename}` }) }

      // If the role to update exists, continue
      else {
        const role = doc;
        UserSchema.findOne({ id }, (err, doc) => {
          if (err) { res.status(500).send({ status: 'server-error', msg: 'Could not connect to database', err }) }

          // If document doesn't exist, send error message
          else if (!doc) { res.status(404).send({ status: 'not-found', msg: `The user you wanted to update does not exist: ID>${id}: ${username}` }) }
          // If user exists, update it with the passed params
          else {
            const user = doc;
            // Check if user already has the role
            const roleExists = user.roles.findIndex(el => el.id === role.id);
            if (roleExists > -1) {
              { res.status(400).send({ status: 'client-error', msg: 'User already has this role assigned', err }) }
            }

            // If user does not have the role yet, add the role and save the updated user
            else {
              user.roles.push(role)
              UserSchema.findOneAndUpdate({ id: user.id }, user, (err, doc) => {
                if (err) {
                  res.status(500).send({ status: 'server-error', msg: 'Could not update user', err })
                } else {
                  res.status(200).send({ status: 'success', msg: `Role ${role.name} has been assigned to user ${doc.username}`, doc })
                }
              });
            }
          }
        });
      }
    })
  }
}

const handleDeleteUserRole = (req, res) => {
  if (!req.query || !req.query.id) {
    res.status(400).send({ status: 'client-error', msg: 'The request URL did not contain the necessary parameters: id' })
  }
  // Check if body has been sent
  else if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.status(400).send({ status: 'client-error', msg: 'The request did not contain a body.' })
  }
  // Check if the body is properly formatted
  else if (!req.body.rolename) {
    res.status(400).send({ status: 'client-error', msg: 'The request did not contain the necessary params: rolename.' })
  }

  // If query and body are correctly available, continue
  else {
    // Extract the id from the query and the rolename from the body
    const id = req.query.id;
    const { rolename } = req.body;

    RolesSchema.findOne({ name: rolename }, (err, doc) => {
      if (err) { res.status(500).send({ status: 'server-error', msg: 'Could not connect to database', err }) }
      else if (!doc) { res.status(404).send({ status: 'not-found', msg: `The role you wanted to assign does not exist: ${rolename}` }) }

      // If the role to update exists, continue
      else {
        const role = doc;
        UserSchema.findOne({ id }, (err, doc) => {
          if (err) { res.status(500).send({ status: 'server-error', msg: 'Could not connect to database', err }) }

          // If document doesn't exist, send error message
          else if (!doc) { res.status(404).send({ status: 'not-found', msg: `The user you wanted to update does not exist: ID>${id}: ${username}` }) }
          // If user exists, update it with the passed params
          else {
            const user = doc;
            // Check if user actually has the role
            const roleExists = user.roles.findIndex(el => el.id === role.id);
            if (roleExists === -1) {
              { res.status(400).send({ status: 'client-error', msg: 'User does not this role assigned' }) }
            }

            // If user does not have the role yet, add the role and save the updated user
            else {
              user.roles.splice(roleExists, 1);
              UserSchema.findOneAndUpdate({ id: user.id }, user, (err, doc) => {
                if (err) {
                  res.status(500).send({ status: 'server-error', msg: 'Could not update user', err })
                } else {
                  res.status(200).send({ status: 'success', msg: `Role ${role.name} has been removed from user ${doc.username}`, doc })
                }
              });
            }
          }
        });
      }
    })
  }
}

const handleDeleteUserById = (req, res) => {
  if (!req.query || !req.query.id) {
    res.status(400).send({ status: 'client-error', msg: 'The request URL did not contain the necessary parameters: id' })
  } else {
    const id = req.query.id;
    UserSchema.findOneAndDelete({ id }, (err, doc) => {
      if (err) {
        res.status(500).send({ status: 'server-error', msg: 'Could not delete user', err })
      } else if (!doc) {
        { res.status(404).send({ status: 'not-found', msg: `The user you want to delete does not exist` }) }
      }
      // If user is deleteable, also delete him in the auth database
      else {
        AuthSchema.findOneAndDelete({ username: doc.username }, (err, doc) => {
          if (err) {
            res.status(500).send({ status: 'server-error', msg: 'Could not delete user', err })
          } else {
            res.status(200).send({ status: 'success', msg: `User ${doc.username} has been removed from the database`, doc })
          }
        })
      }
    })
  }
}

module.exports = {
  handleCreateRole,
  handleGetRoleList,
  handleDeleteRoleById,
  handleCreateCodetype,
  handleGetCodetypeList,
  handleDeleteCodetypeById,
  handleCreateCodelanguage,
  handleGetCodelanguageList,
  handleDeleteCodelanguageById,
  handleAddUserRole,
  handleDeleteUserRole,
  handleDeleteUserById
}