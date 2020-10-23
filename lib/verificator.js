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

  getErrors() {
    return this.errors;
  }

  addError(err) {
    this.errors.unshift(err)
  }

  email(inputValue) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(inputValue).toLowerCase())) {
      this.addError(`Value ${inputValue} is not a valid email adress`)
    }
    return this;
  }

  string(inputValue) {
    const checkType = typeof inputValue === 'string';
    if (!checkType) {
      this.addError(`Value ${inputValue} is not a string`)
    }
    return this;
  }

  check() {
    // hasErrors returns true if there's errors
    const errorLength = this.errors.length;
    const hasErrors = errorLength > 0 ? true : false;

    // Return false if there's any errors
    if (hasErrors) {
      if(this.environment === "development") {
        console.log(`${errorLength} errors have been recognized.`)
        this.getErrors().forEach(error => console.log(error))
      }
      return false;
    } else {
      return true;
    }
  }
}

module.exports = Verificator;