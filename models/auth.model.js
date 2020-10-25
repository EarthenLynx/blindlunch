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
 * @method signup(connection,userDetails) Creates a new user in auth and login database
 * @method authenticate(connection,userDetail) Creates a jwt that can be used for login path
 * @method login(connection,userid) Verifies user integrity and gives out a user jwt.
 * @method updateMyPassword(connection,session,payload) 
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
  async signup(connection, userDetails) {
    const v = new Verificator(process.env.NODE_ENV);
    const { username, password, email, companyName, departmentName, prefOtherDep } = await userDetails;

    // Do basic validation
    const validEmail = v.email(email).check();
    const validInput = v.filled(username).filled(password).filled(email).filled(companyName).filled(departmentName).filled(prefOtherDep).check();

    if (!validEmail) {
      throw new TypeError('Please enter a valid email adress')
    } else if (!validInput) {
      throw new TypeError('Please fill out all mandatory information')
    } else {
      const id = crs({ length: 15 })
      const queryUserLogin = `INSERT INTO USER_LOGIN (id, username, email, companyName, departmentName, prefOtherDep) VALUES ('${id}', '${username}', '${email}', '${companyName}', '${departmentName}', '${prefOtherDep}');`;
      const loginRes = await this.post(connection, queryUserLogin).catch(err => err);
      // Check if there's a duplicate entry or another err before posting 
      if (this.hasErrAt(loginRes)) {
        return loginRes
      }
      // If there is no error with the loginResponse, continue
      else {
        const passwordHash = await bcrypt.hash(password, 12);
        const queryUserAuth = `INSERT INTO USER_AUTH (id, username, password) VALUES ('${id}', '${username}', '${passwordHash}');`
        const authRes = await this.post(connection, queryUserAuth).catch(err => err);
        if (this.hasErrAt(authRes)) {
          return loginRes
        }
        // If no errors happened during the queries, finish the function
        else {
          return { authRes, loginRes }
        }
      }
    }
  }

  /**
   * @public
   * 
   * @function
   * 
   * @param {Object} connection The SQL Connection object created by the connect method
   * @param {Object} userDetails  The User object that is to be passed as a payload
   */
  async authenticate(connection, userDetails) {
    const v = new Verificator(process.env.NODE_ENV);
    const { username, password } = await userDetails;

    const validInput = v.filled(username).filled(password).check();
    if (!validInput) throw new TypeError('Please fill out your user credentials');

    // If input is non empty, search for the user in the auth db and send back its id, if available
    else {
      const queryUserAuthentication = `SELECT * FROM USER_AUTH WHERE username='${username}';`
      const authRes = await this.get(connection, queryUserAuthentication).catch(err => err);
      if (this.hasErrAt(authRes)) {
        return authRes;
      }

      // Check if user exists
      else {
        const exists = v.filled(authRes.results).check();
        if (!exists) {
          return { exists }
        }
        // If user does exist, continue
        else {
          const user = authRes.results[0]
          const authenticated = await bcrypt.compare(password, user.password)

          if (!authenticated) {
            return { exists, authenticated }
          } else {
            const id = authRes.results[0].id;
            return { exists, authenticated, id }
          }
        }
      }
    }
  }

  /**
   * @public
   * 
   * @function
   * 
   * @param {Object} connection The SQL Connection object created by the connect method
   * @param {String} userid The user's id that has been passed into the jwt by the authenticate() function
   */

  async login(connection, userid) {
    const queryUserLogin = `SELECT id, username, email, role, prefOtherDep, lastLoginAt FROM USER_LOGIN WHERE ID='${userid}'`;
    const authRes = await this.get(connection, queryUserLogin).catch(err => err);
    if (this.hasErrAt(authRes)) {
      return authRes;
    }

    const user = await authRes.results[0];
    return user
  }

  /**
   * @public
   * 
   * @function
   * 
   * @param {Object} connection The SQL Connection object created by the connect method
   * @param {Object} session The jwt payload that contains the user's authentication data
   * @param {Object} payload The input that's being used to CRUD user's data
   */
  async updateMyPassword(connection, session, payload) {
    const v = new Verificator(process.env.NODE_ENV);
    const { id } = await session
    const { oldpassword, newpassword } = await payload;

    // Do basic validation
    const validInput = v.filled(oldpassword).filled(newpassword).check();
    const passwordsDistinct = v.notequal(oldpassword, newpassword).check();
    if (!validInput) throw new TypeError('Please fill out your user credentials')
    else if (!passwordsDistinct) throw new Error('Old password and new password must not be equal')

    // If input is valid, continue
    else {
      const queryUserAuthentication = `SELECT password FROM USER_AUTH WHERE id='${id}';`
      const authRes = await this.post(connection, queryUserAuthentication).catch(err => err);
      if (this.hasErrAt(authRes)) {
        return authRes;
      }

      // Check if passwords match
      const oldPasswordHash = await authRes.results[0].password
      const passwordsMatch = await bcrypt.compare(oldpassword, oldPasswordHash);

      if (!passwordsMatch) {
        throw new Error('Passwords do not match')
      }
      // If passwords match, create a new hash and save it to the db
      else {
        const newPasswordHash = await bcrypt.hash(newpassword, 12);
        const queryUpdatePassword = `UPDATE USER_AUTH SET password='${newPasswordHash}' WHERE id='${id}'`
        const authRes = await this.post(connection, queryUpdatePassword).catch(err => err);
        if (this.hasErrAt(authRes)) {
          return authRes;
        }

        return authRes;

      }
    }


    // TODO: Hash the new pw and update the DB entry
  }
}

module.exports = AuthModel