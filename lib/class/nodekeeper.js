const crs = require("crypto-random-string")

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

  set(length) {
    const key = crs({ length, type: 'base64' });
    const value = crs({ length, type: 'base64' });

    if (process.env.NODE_ENV === "development") log(3, `Attempting to create temporary process variable with [key: ${key} value: ${value}]`)
    process.env[key] = value;
    if (process.env.NODE_ENV === "development") log(3, `Result: ${process.env[key]}`)
    return { key, value }
  }
  
  compare(key, value) {
    if (process.env.NODE_ENV === "development") log(3, `Attempting to find process variable with [key: ${key} value: ${value}]`)
    if (process.env.NODE_ENV === "development") log(3, `Check for availability: ${process.env[key]}`)
    if (process.env[key]) {
      return process.env[key] === value
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