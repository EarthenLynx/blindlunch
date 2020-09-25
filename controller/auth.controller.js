const crs = require("crypto-random-string");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthSchema = require("../models/auth.model");
const UserSchema = require("../models/user.model");

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
            process.env[authKey] = authValue;

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
}

const handleLogin = (req, res) => {
  console.log('Hit login route');
  const jwtName = process.env.AUTH_TOKEN_NAME;
  const jwtSignature = process.env.AUTH_SECRET;
  const token = req.cookies[jwtName]


  jwt.verify(token, jwtSignature, (err, payload) => {
    const { authKey, authValue } = payload

    // Check if the information inside the process fits the one from the token
    if (process.env[authKey] !== authValue) {
      delete process.env[authKey];
      res.status(401).send({ status: 'not-authorized', msg: `You are not permitted to enter this route.` })
    }

    // If authentication is handled, continue the actual login and send the jwt to the client
    else {
      delete process.env[authKey];
      UserSchema.findOne({ username: payload.aud }, (err, doc) => {
        if (err) res.status(404).send({ status: 'not-found', msg: `User - password combination not found.` })

        // If user is found in database, continue
        else {
          const jwtPayload = { authKey, authValue }
          const jwtName = process.env.API_TOKEN_NAME;
          const jwtSignature = process.env.API_SECRET;
          const jwtOptions = {
            audience: doc.username,
            issuer: req.hostname,
            expiresIn: '4h'
          }

          // Create the JWT and sign it
          jwt.sign(jwtPayload, jwtSignature, jwtOptions, (err, token) => {
            if (err) { res.status(500).send({ status: 'server-error', msg: `An error occured while authenticating.` }) }

            // If there's no error, issue the token to the client and redirect
            else {
              res.status(200).cookie(jwtName, token).send({ status: 'success', msg: 'Successfully logged in!', token });
            }
          })
        }
      })
    }
  })
}

module.exports = { handleAuthenticate, handleLogin };