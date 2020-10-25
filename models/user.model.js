const SqlConnector = require("../lib/class/connector");
const Verificator = require("../lib/class/verificator");

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

  /**
   * @public
   * 
   * @function
   * 
   * @param {Object} connection The SQL Connection object created by the connect method
   * @param {Object} session The jwt payload that contains the user's authentication data
   */
  async getMyData(connection, session) {
    const { id } = session;
    const queryUserLogin = `SELECT id, username, email, companyName, departmentName, prefOtherDep, canBeFound FROM USER_LOGIN WHERE ID='${id}'`;
    const myDataRes = await this.get(connection, queryUserLogin).catch(err => err);
    if (this.hasErrAt(myDataRes)) {
      return myDataRes;
    }

    const user = await myDataRes.results[0];
    user.prefOtherDep = user.prefOtherDep === 1 ? true : false;
    user.canBeFound = user.canBeFound === 1 ? true : false;
    return user
  }

  /**
   * @function
   * 
   * @param {Object} connection The SQL Connection object created by the connect method
   * @param {Object} session The jwt payload that contains the user's authentication data
   * @param {Object} payload The input that's being used to CRUD user's data
   */
  async updateMyData(connection, session, payload) {
    const v = new Verificator(process.env.NODE_ENV);
    const { id } = session
    const { username, email, companyName, departmentName, prefOtherDep, canBeFound } = payload

    // Do basic validation
    const validEmail = v.email(email).check();
    const validInput = v.filled(username).filled(email).filled(companyName).filled(departmentName).tinyInt(prefOtherDep).tinyInt(canBeFound).check();

    if (!validEmail) {
      throw new TypeError('Please enter a valid email adress')
    } else if (!validInput) {
      throw new TypeError('Please fill out all mandatory information')
    } else {
      const queryUserData = `UPDATE USER_LOGIN SET username='${username}', email='${email}', companyName='${companyName}', departmentName='${departmentName}', prefOtherDep='${prefOtherDep ? 1 : 0}', canBeFound='${canBeFound ? 1 : 0}' WHERE id='${id}'`
      const userDataRes = await this.post(connection, queryUserData).catch(err => err)

      return userDataRes
    }
  }
}


module.exports = UserModel