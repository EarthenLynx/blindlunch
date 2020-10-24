let log;
if (process.env.NODE_ENV === 'development') {
  log = require('../util/clog');
}

/**
 * @class
 * 
 * @private
 * 
 * @param {String} envirnment Environment the lib is used in. If it's set to development, Verificator will do console logging
 * @param {Array} errors An array to store the errors in that occur
 * 
 * @method 
 */

class Verificator {
  constructor(environment = 'development', errors = []) {
    this.environment = environment
    this.errors = errors
  }

  // Private methods
  getErrors() {
    return this.errors;
  }

  addError(err) {
    this.errors.unshift(err)
  }

  check() {
    // hasErrors returns true if there's errors
    const errorLength = this.errors.length;
    const hasErrors = errorLength > 0 ? true : false;

    // Return false if there's any errors
    if (hasErrors) {
      if (this.environment === "development") {
        log(1, `${errorLength} errors have been recognized.`)
        this.getErrors().forEach(error => log(1, error))
      }
      return false;
    } else {
      return true;
    }
  }

  // Public methods
  // Check for data types
  string(inputValue) {
    const checkType = typeof inputValue === 'string';
    if (!checkType) {
      this.addError(`Value ${inputValue} is not a string`)
    }
    return this;
  }

  number(inputValue) {
    const checkType = typeof inputValue === 'number'
    if (!checkType) {
      this.addError(`Value ${inputValue} is not a number`)
    }
    return this;
  }

  array(inputValue) {
    const checkType = inputValue instanceof Array;
    if (!checkType) {
      this.addError(`Value ${inputValue} is not an array`)
    }
    return this;
  }

  object(inputValue) {
    const checkType = typeof inputValue === 'object'
    if (!checkType) {
      this.addError(`Value ${inputValue} is not an object`)
    }
    return this;
  }

  boolean(inputValue) {
    const checkType = typeof inputValue === 'boolean'
    if (!checkType) {
      this.addError(`Value ${inputValue} is not boolean`)
    }
    return this;
  }

  tinyInt(inputValue) {
    if (!inputValue === 0 && !inputValue === 1) {
      this.addError(`Value ${inputValue} is not a tinyint`)
    }
    return this;
  }

  // Check for specific queries
  email(inputValue) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(inputValue).toLowerCase())) {
      this.addError(`Value ${inputValue} is not a valid email adress`)
    }
    return this;
  }

  filled(inputValue) {
    let inputType;

    if (inputValue instanceof Array) inputType = 'array'
    else inputType = typeof inputValue

    switch (inputType) {
      case 'string':
        let checkFilledString = inputValue.length > 0;
        if (!checkFilledString) {
          this.addError(`The string you passed in is empty`)
        }
        break;

      case 'array':
        let checkEmptyArray = inputValue.length > 0;
        if (!checkEmptyArray) {
          this.addError(`The array you passed in is empty`)
        }
        return this;

      case 'object':
        let checkEmptyObject = Object.keys(inputValue).length > 0;
        if (!checkEmptyObject) {
          this.addError(`The object you've passed in is empty`)
        }
        return this;

      case 'boolean':
        return this;

      default:
        this.addError(`Input ${inputValue} is either undefined or cannot be verified`)
        break;
    }
    return this;
  }

  empty(inputValue) {
    const inputType = typeof inputValue;

    switch (inputType) {
      case 'string':
        let checkEmptyString = inputValue.length === 0;
        if (!checkEmptyString) {
          this.addError(`Value ${inputValue} is not an empty string`)
        }
        return this;

      case 'array':
        let checkEmptyArray = inputValue.length === 0;
        if (!checkEmptyArray) {
          this.addError(`Value ${inputValue} is not an empty array`)
        }
        return this;

      case 'object':
        let checkEmptyObject = Object.keys(inputValue).length === 0;
        if (!checkEmptyObject) {
          this.addError(`Value ${inputValue} is not an empty object`)
        }
        return this;



      default:
        return this;
    }
  }
}

module.exports = Verificator;