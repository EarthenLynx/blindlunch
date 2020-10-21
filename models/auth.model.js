const SqlConnector = require("../lib/connector");
const bcrypt = require("bcrypt");
const crs = require("crypto-random-string");

class AuthModel extends SqlConnector {
  constructor(host, user, password, database) {
      super(host, user, password, database)
  }

  async registerNewUser(connection, userDetails) {
    const {username, password, email, company, department, prefOtherDep} = await userDetails
    console.log(userDetails);

    const id = crs({length: 15})
    const passwordHash = await bcrypt.hash(password, 12);
    

    const queryUserAuth = `INSERT INTO USER_AUTH (id, username, password) VALUES ('${id}', '${username}', '${passwordHash}');`
    const queryUserLogin = `INSERT INTO USER_LOGIN (id, username, email, company, department, prefOtherDep) VALUES ('${id}', '${username}', '${email}', '${company}', '${department}', '${prefOtherDep}');`;

    const authRes = await this.post(connection, queryUserAuth); 
    const loginRes = await this.post(connection, queryUserLogin)

    return {authRes, loginRes}
  }
}

module.exports = AuthModel