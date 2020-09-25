const crs = require("crypto-random-string");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthSchema = require("../models/auth.model");

const handleAuthenticate = (req, res) => {

  // Check if body is non - empty
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.status(400).send({ status: 'client-error', msg: 'The request did not contain a body.' })
  }

  else {
    // Extract username and password from the request's body
    const { username, password } = req.body;

    // Try and locate a user in the db
    AuthSchema.findOne({ username }, (err, doc) => {
      // Check for errors and empty returns
      if (err) { res.status(500).send({ status: 'server-error', msg: 'Could not connect to database: ', err }) }
      else if (!doc) { res.status(404).send({ status: 'not-found', msg: `User - password combination not found.` }) }

      // If user was found, continue
      else {
        bcrypt.compare(password, doc.password, (err, hash) => {
          if (err) { res.status(500).send({ status: 'server-error', msg: 'Error during password validation: ', err }) }
          else if (!hash) { res.status(404).send({ status: 'not-found', msg: `User - password combination not found.` }) }

          // If there's no error and passwords match, continue. The user is now authorized to login
          else {
            // First, create a key-value pair 
            const authKey = crs({ length: 20, type: 'base64' });
            const authValue = crs({ length: 25, type: 'base64' });

            // Save it in the process
            process.env.AUTH_KEY = authKey;
            process.env.AUTH_VALUE = authValue;

            // Create the JWT config and content
            const jwtPayload = { authKey, authValue }
            const jwtName = process.env.AUTH_TOKEN_NAME;
            const jwtSignature = process.env.AUTH_SECRET;
            const jwtOptions = {
              audience: doc.username,
              issuer: req.hostname,
              expiresIn: '1m'
            }

            // Create the JWT and sign it
            jwt.sign(jwtPayload, jwtSignature, jwtOptions, (err, token) => {
              if (err) { res.status(500).send({ status: 'server-error', msg: `An error occured while authenticating.` }) }

              // If there's no error, issue the token to the client and redirect
              else {
                res.status(200).cookie(jwtName, token).redirect('/api/auth/login');
              }
            })
          }
        })
      }
    })
  }
  // TODO: Continue here 
  console.log(req.body)
  console.log('Received POST request on auth route');
}

module.exports = { handleAuthenticate };