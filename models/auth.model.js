const SqlConnector = require("../lib/connector");

class AuthModel extends SqlConnector {
  constructor(host, user, password, database) {
      super(host, user, password, database)
  }
}

module.exports = AuthModel