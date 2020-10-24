const jwt = require("jsonwebtoken");

// Include classes to be used
const AuthModel = require("../models/auth.model");
const Nodekeeper = require("../lib/class/nodekeeper");

const handleSignup = async (req, res) => {
  const { DB_HOST, DB_USERNAME, DB_USER_PASSWORD, DB_DATABASE_NAME } = process.env;
  const Auth = new AuthModel(DB_HOST, DB_USERNAME, DB_USER_PASSWORD, DB_DATABASE_NAME);
  const userDetails = req.body;

  const connection = await Auth.connect()
  const response = await Auth.signup(connection, userDetails).catch(err => new Error(err));
  if (Auth.hasErrAt(response)) {
    await res.status(500).send({ status: 'error', msg: `An error occured while trying to signup: ${response.sqlMessage}` })
  } else {
    await res.status(201).send({ status: 'success', msg: 'User successfully created. You may now login' })
  }
  Auth.close(connection)
}

handleAuthenticate = async (req, res) => {
  const { DB_HOST, DB_USERNAME, DB_USER_PASSWORD, DB_DATABASE_NAME } = process.env;
  const Auth = new AuthModel(DB_HOST, DB_USERNAME, DB_USER_PASSWORD, DB_DATABASE_NAME);
  const userDetails = req.body;

  const connection = await Auth.connect();

  // Look for a user in the database and return it if there is one
  const user = await Auth.authenticate(connection, userDetails).catch(err => new Error(err));
  if (!user.exists || !user.authenticated) {
    res.status(404).send({ status: 'not-found', msg: 'User - password combination not found' })
  }

  // If user was found, sign a json webtoken and allow the user to login
  else {
    const n = new Nodekeeper();
    const pair = n.set(20)
    const secret = process.env.SECRET;
    const options = {
      audience: req.ip,
      issuer: process.env.HOST,
      expiresIn: '1m'
    }

    const token = jwt.sign(pair, secret, options);

    res.status(200).send({ status: 'success', msg: 'User found. You may now login', token })
  }
  await Auth.close(connection)
}

module.exports = { handleSignup, handleAuthenticate }






// const handleAuthenticate = (req, res) => {
//   let msg;

//   // Check if body is non - empty
//   if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
//     status = 400;
//     msg = 'The request did not contain a body.';
//     authErrorLog(req.ip, status, msg);
//     res.status(status).send({ status: 'client-error', msg });
//   }

//   else {
//     // Extract username and password from the request's body
//     const { username, password } = req.body;

//     // Try and locate a user in the db
//     AuthSchema.findOne({ username }, (err, doc) => {
//       // Check for errors and empty returns
//       if (err) {
//         status = 500;
//         msg = 'Could not connect to database: ';
//         authErrorLog(req.ip, status, msg);
//         res.status(status).send({ status: 'server-error', msg, err })
//       }
//       else if (!doc) {
//         status = 404;
//         msg = `User - password combination not found.`;
//         authErrorLog(req.ip, status, msg);
//         res.status(status).send({ status: 'not-found', msg, err })
//       }

//       // If user was found, continue
//       else {
//         bcrypt.compare(password, doc.password, (err, hash) => {
//           if (err) {
//             status = 500;
//             msg = 'Error during password validation: ';
//             authErrorLog(req.ip, status, msg);
//             res.status(status).send({ status: 'server-error', msg, err })
//           }
//           else if (!hash) {
//             status = 404;
//             msg = `User - password combination not found.`;
//             authErrorLog(req.ip, status, msg);
//             res.status(status).send({ status: 'not-found', msg })
//           }

//           // If there's no error and passwords match, continue. The user is now authorized to login
//           else {
//             // First, create a key-value pair 
//             const authKey = crs({ length: 20, type: 'base64' });
//             const authValue = crs({ length: 25, type: 'base64' });

//             // Save it in the process
//             process.env[authKey] = authValue;

//             // Create the JWT config and content
//             const jwtPayload = { authKey, authValue }
//             const jwtName = process.env.AUTH_TOKEN_NAME;
//             const jwtSignature = process.env.AUTH_SECRET;
//             const jwtOptions = {
//               audience: doc.username,
//               issuer: req.hostname,
//               expiresIn: '1m'
//             }

//             // Create the JWT and sign it
//             jwt.sign(jwtPayload, jwtSignature, jwtOptions, (err, token) => {
//               if (err) {
//                 status = 500;
//                 msg = `An error occured while authenticating.`;
//                 authErrorLog(req.ip, status, msg);
//                 res.status(status).send({ status: 'server-error', msg })
//               }

//               // If there's no error, issue the token to the client and redirect
//               else {
//                 res.status(200).cookie(jwtName, token).redirect('/api/auth/login');
//               }
//             })
//           }
//         })
//       }
//     })
//   }
// }

// const handleLogin = (req, res) => {
//   console.log('Hit login route');
//   const jwtName = process.env.AUTH_TOKEN_NAME;
//   const jwtSignature = process.env.AUTH_SECRET;
//   const token = req.cookies[jwtName]


//   jwt.verify(token, jwtSignature, (err, payload) => {
//     const { authKey, authValue } = payload

//     // Check if the information inside the process fits the one from the token
//     if (process.env[authKey] !== authValue) {
//       delete process.env[authKey];
//       res.status(401).send({ status: 'not-authorized', msg: `You are not permitted to enter this route.` })
//     }

//     // If authentication is handled, continue the actual login and send the jwt to the client
//     else {
//       delete process.env[authKey];
//       UserSchema.findOneAndUpdate({ username: payload.aud }, {lastLogin: moment()}, (err, doc) => {
//         if (err) res.status(404).send({ status: 'not-found', msg: `User - password combination not found.` })

//         // If user is found in database, continue
//         else {
//           const jwtName = process.env.API_TOKEN_NAME;
//           const jwtSignature = process.env.API_SECRET;
//           const jwtPayload = {
//             id: doc.id,
//             roles: doc.roles,
//             codeIds: doc.codeIds,
//             lastLogin: doc.lastLogin,
//           }
//           const jwtOptions = {
//             audience: doc.username,
//             issuer: req.hostname,
//             expiresIn: '4h'
//           }

//           // Create the JWT and sign it
//           jwt.sign(jwtPayload, jwtSignature, jwtOptions, (err, token) => {
//             if (err) { res.status(500).send({ status: 'server-error', msg: `An error occured while authenticating.` }) }

//             // If there's no error, issue the token to the client and redirect
//             else {
//               res.status(200).cookie(jwtName, token).send({ status: 'success', msg: 'Successfully logged in!', token });
//             }
//           })
//         }
//       })
//     }
//   })
// }

// module.exports = { handleAuthenticate, handleLogin };