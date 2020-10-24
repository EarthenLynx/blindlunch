const jwt = require("jsonwebtoken");
let log;
if (process.env.NODE_ENV === 'development') {
  log = require('../util/clog');
}

const getAuthtokenFrom = (req) => {
  if (req.cookies[process.env.AUTH_TOKENNAME]) {
    if (process.env.NODE_ENV === "development") log(3, `Extracted auth-token from cookies`)
    return req.cookies[process.env.AUTH_TOKENNAME]
  } else if (req.headers.Authorization) {
    // TODO: Untested
    if (process.env.NODE_ENV === "development") log(3, `Extracted auth-token from auth header`)
    return req.headers.Authorization.split("Bearer ")[0];
  } else {
    if (process.env.NODE_ENV === "development") log(1, `Could not find any auth-token`)
    throw new Error('No token recognized.')
  }
}

const getUsertokenFrom = (req) => {
  if (req.cookies[process.env.USER_TOKENNAME]) {
    if (process.env.NODE_ENV === "development") log(3, `Extracted user-token from cookies`)
    return req.cookies[process.env.USER_TOKENNAME]
  } else if (req.headers.Authorization) {
    // TODO: Untested
    if (process.env.NODE_ENV === "development") log(3, `Extracted user-token from auth header`)
    return req.headers.Authorization.split("Bearer ")[0];
  } else {
    if (process.env.NODE_ENV === "development") log(1, `Could not find any user-token`)
    throw new Error('No token recognized.')
  }
}

/**
 * @function
 * 
 * @param {Object} req Request object received by the requesting client
 * @param {Object} payload JWT payload 
 */
const verifyAudience = (req, payload) => {
  const ip = req.ip;
  const aud = payload.aud

  if (process.env.NODE_ENV === "development") log(3, `Payload audience: ${aud} | Requestor's IP: ${ip}`)
  return ip === aud;
}


/**
 * @function
 * @async
 * 
 * @param {Object} req Request object received by the requesting client
 * @param {Array} roles An array of objects that may access this service
 */
const verifyUser = async (req, roles) => {
  const secret = process.env.SECRET;
  const token = await getUsertokenFrom(req);
  const user = jwt.verify(token, secret)

  // Check if the user's role is within the roles defined for each route
  const exists = await roles.findIndex(role => role === user.role)
  if(exists === -1) {
    throw new Error('You are not authorized to view this resource')
  } 
  // If role is found in the user token's payload, pass it back to the calling function
  else {
    return user
  }
}

module.exports = { getAuthtokenFrom, getUsertokenFrom, verifyAudience, verifyUser }