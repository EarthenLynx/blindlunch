const UserModel = require("../models/user.model");
const { DB_HOST, DB_USERNAME, DB_USER_PASSWORD, DB_DATABASE_NAME } = process.env;
const User = new UserModel(DB_HOST, DB_USERNAME, DB_USER_PASSWORD, DB_DATABASE_NAME)

const handleGetMyData = async (req, res, session) => {
  const connection = await User.connect()
  const user = await User.getMyData(connection, session).catch(err => err)
  res.status(200).send({ status: 'success', msg: 'Fetched your user data', data: user });
  return User.close(connection)
}

const handleUpdateMyData = async (req, res, session) => {
  const connection = await User.connect();
  const payload = req.body;
  const user = await User.updateMyData(connection, session, payload).catch(err => err)
  res.status(201).send({ status: 'success', msg: 'Your userdata have been updated' });
  return User.close(connection)
}

module.exports = { handleGetMyData, handleUpdateMyData }