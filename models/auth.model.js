const SqlConnector = require("../lib/class/connector");
const bcrypt = require("bcrypt");
const crs = require("crypto-random-string");
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
 * @method registerNewUser(connection,userDetails) Creates a new user in auth and login database
 */

class AuthModel extends SqlConnector {
  constructor(host, user, password, database) {
    super(host, user, password, database)
  }

  /**
   * @public
   * 
   * @function
   * 
   * @param {Object} connection The SQL Connection object created by the connect method
   * @param {Object} userDetails  The User object that is to be passed as a payload
   */
  async registerNewUser(connection, userDetails) {
    const v = new Verificator(process.env.NODE_ENV);
    const { username, password, email, company, department, prefOtherDep } = await userDetails

    const validEmail = v.email(email).check();
    const validInput = v.filled(username).filled(password).filled(email).filled(company).filled(department).filled(prefOtherDep).check();

    if (!validEmail) throw new TypeError('Please enter a valid email adress')
    if (!validInput) throw new TypeError('Please fill out all mandatory information')
    const id = crs({ length: 15 })
    const passwordHash = await bcrypt.hash(password, 12);


    const queryUserAuth = `INSERT INTO USER_AUTH (id, username, password) VALUES ('${id}', '${username}', '${passwordHash}');`
    const queryUserLogin = `INSERT INTO USER_LOGIN (id, username, email, company, department, prefOtherDep) VALUES ('${id}', '${username}', '${email}', '${company}', '${department}', '${prefOtherDep}');`;

    const authRes = await this.post(connection, queryUserAuth);
    const loginRes = await this.post(connection, queryUserLogin)

    return { authRes, loginRes }
  }
}

module.exports = AuthModel