let log;
if (process.env.NODE_ENV === 'development') {
  log = require('../util/clog');
}

/**
 * @class
 * 
 * @private
 * 
 * @param {String} alphabet The letters to be used for string creation
 * 
 * @method create(length) Creates a random string based on the alphabet with which the object was initialized
 * @method set(length) Calls the create() method to create a new process.env variable
 * @method destroy(key) Destroys the variable to free mem space.
 */

class Nodekeeper {
  constructor(alphabet = "01234567890abcdefghijklmnopqrstuvwxyz!§$%&/()=?") {
    this.alphabet = alphabet
  }

  create(length) {
    const aLength = this.alphabet.length;
    let random = "";
    for (let i = 0; i <= length; i++) {
      random += this.alphabet.charAt(Math.floor(Math.random() * aLength))
    }
    random = Buffer.from(random).toString('base64')
    if (process.env.NODE_ENV === "development") log(2, `Creating node.env global with length ${aLength}. Value: ${random} `)
    return random;
  }

  set(length) {
    const key = this.create(length);
    const value = this.create(length);

    process.env[key] = value
    return { key, value }
  }

  find(key) {
    if(process.env[key]) {
      return process.env[key]
    } else {
      if (process.env.NODE_ENV === "development") log(1, `Could not find key ${key}`)
      throw new Error('Could not find the specified key in node process')
    }
  }

  destroy(key) {
    if (!key) throw new Error('Could not find the key to be deleted')
    else {
      delete process.env[key]
      return true
    };
  }
}

module.exports = Nodekeeper

// // Save it in the process
// process.env[authKey] = authValue;

// // Create the JWT config and content
// const jwtPayload = { authKey, authValue }
// const jwtName = process.env.AUTH_TOKEN_NAME;
// const jwtSignature = process.env.AUTH_SECRET;
// const jwtOptions = {
//   audience: doc.username,
//   issuer: req.hostname,
//   expiresIn: '1m'
// }