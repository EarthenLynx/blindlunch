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
        console.log(`${errorLength} errors have been recognized.`)
        this.getErrors().forEach(error => console.log(error))
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

  // Check for specific queries
  email(inputValue) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(inputValue).toLowerCase())) {
      this.addError(`Value ${inputValue} is not a valid email adress`)
    }
    return this;
  }

  empty(inputValue) {
    const inputType = typeof inputValue;

    switch (inputType) {
      case 'object':
        let checkEmptyObject = Object.keys(inputValue).length === 0;
        if (!checkEmptyObject) {
          this.addError(`Value ${inputValue} is not an empty object`)
        }
        return this;

      case 'array':
        let checkEmptyArray = inputValue.length === 0;
        if (!checkEmptyArray) {
          this.addError(`Value ${inputValue} is not an empty array`)
        }
        return this;

      default:
        return this;
    }
  }
}

module.exports = Verificator;