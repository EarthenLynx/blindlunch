const jwt = require("jsonwebtoken")
const SqlConnector = require("../lib/class/connector");
const Verificator = require("../lib/class/verificator");
const { getUsertokenFrom } = require("../lib/util/jwt");

/**
 * @public
 * 
 * @class
 * 
 * @param {String} host The name of the SQL database host
 * @param {String} user The username of the db user
 * @param {String} password The password of the db user
 * @param {string} database The name of the database to connect to
 * 
 * @method connect() Returns a promise that resolves into a SQL connection
 * @method close(connection) Accepts a connection object and closes the connection
 * @method get(connection,query) Executes a SELECT query on the specified query
 * @method post(connection,query) Executes a UPDATE query on the specified query
 */

class UserModel extends SqlConnector {
  constructor(host, user, password, database) {
    super(host, user, password, database)
  }

  async getMyData(connection, payload) {
    const { id } = payload;
    const queryUserLogin = `SELECT id, username, email, companyName, departmentName, prefOtherDep, canBeFound FROM USER_LOGIN WHERE ID='${id}'`;
    const authRes = await this.get(connection, queryUserLogin).catch(err => err);
    if (this.hasErrAt(authRes)) {
      return authRes;
    }

    const user = await authRes.results[0];
    return user
  }
}


module.exports = UserModel