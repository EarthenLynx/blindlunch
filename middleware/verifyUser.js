const jwt = require("jsonwebtoken");

// Check for three different user types. 
// This functions will have to be executed either in the router or right before executing controller logic
const verifyUser = (req, res, userRole, callback) => {
  const jwtName = process.env.API_TOKEN_NAME;
  const jwtSignature = process.env.API_SECRET;
  const token = req.cookies[jwtName];

  jwt.verify(token, jwtSignature, (err, payload) => {
    if (err) return res.status(500).send({ status: 'server-error', msg: 'Token could not be verified.', err })

    // If token is valid, continue
    else {
      // Loop through the role to try and find a role as 'guest'
      const found = payload.roles.findIndex(role => role.name === userRole);

      // If the index of the role is equal to -1, it does not exist. In that case, user is not permitted to continue
      if (found === -1) {
        return res.status(401).send({ status: 'not-authorized', msg: 'You are not permitted to view this resource.' })
      }

      // If it does, the user is permitted to continue
      else {
        callback(payload);
      }
    }
  })
}

module.exports = { verifyUser }