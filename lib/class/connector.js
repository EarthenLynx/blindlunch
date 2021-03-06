const mysql = require("mysql");
let log;
if (process.env.NODE_ENV === 'development') {
  log = require('../util/clog');
}

/**
 * @private
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
class SqlConnection {
  constructor(host, user, password, database) {
    if (!host | !password | !password | !database) {
      throw new TypeError("Please add all mandatory variables in the SqlConnection class")
    } else {
      this.host = host
      this.user = user
      this.password = password
      this.database = database
    }
  }

  // Connection methods
  connect() {
    return new Promise(resolve => {
      const connection = mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database
      });
      if (process.env.NODE_ENV === "development") log(3, 'Connection opened')
      resolve(connection)
    })
  }

  hasErrAt(response) {
    return Object.keys(response).find(param => param === 'errno') ? true : false
  }

  close(connection) {
    if (process.env.NODE_ENV === "development") log(3, 'Connection closed')
    return new Promise((resolve) => resolve(connection.end()))
  }

  // CRUD Methods require a connection object to be passed in
  get(connection, query) {
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results, fields) => {
        if (error) {
          if (process.env.NODE_ENV === "development") log(1, `Could not GET: ${error}`)
          reject(error)
        }
        else {
          resolve({ results, fields })
        }
      })
    })
  }

  post(connection, query) {
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results, fields) => {
        if (error) {
          if (process.env.NODE_ENV === "development") log(1, `Could not POST: ${error}`)
          reject(error)
        }
        else {
          resolve({ results, fields })
        }
      })
    })
  }
}

module.exports = SqlConnection