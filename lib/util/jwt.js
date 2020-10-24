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

const verifyAudience = (req, payload) => {
  const ip = req.ip;
  const aud = payload.aud

  if (process.env.NODE_ENV === "development") log(3, `Payload audience: ${aud} | Requestor's IP: ${ip}`)
  return ip === aud;
}

module.exports = { getAuthtokenFrom, getUsertokenFrom, verifyAudience }