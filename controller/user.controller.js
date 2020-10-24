const UserModel = require("../models/user.model");
const { DB_HOST, DB_USERNAME, DB_USER_PASSWORD, DB_DATABASE_NAME } = process.env;
const User = new UserModel(DB_HOST, DB_USERNAME, DB_USER_PASSWORD, DB_DATABASE_NAME)

const handleGetMyData = async (req, res, payload) => {
  const connection = await User.connect()
  const user = await User.getMyData(connection, payload).catch(err => err)
  res.status(200).send(user);
  return User.close(connection)
}

// const handleUpdateMyData = async (req, res, payload) => {

// }

module.exports = { handleGetMyData }