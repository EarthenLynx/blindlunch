const UserModel = require("../models/user.model");
const { DB_HOST, DB_USERNAME, DB_USER_PASSWORD, DB_DATABASE_NAME } = process.env;
const User = new UserModel(DB_HOST, DB_USERNAME, DB_USER_PASSWORD, DB_DATABASE_NAME)

const handleGetMyData = async (req, res, session) => {
  const connection = await User.connect()

  try {
    const user = await User.getMyData(connection, session).catch(err => err)
    res.status(200).send({ status: 'success', msg: 'Fetched your user data', data: user });
  } catch (error) {
    res.status(500).send({ status: 'error', msg: err.message })
  } finally {
    return User.close(connection)
  }

}

const handleUpdateMyData = async (req, res, session) => {
  const connection = await User.connect();
  const payload = req.body;

  try {
    const success = await User.updateMyData(connection, session, payload)
    res.status(201).send({ status: 'success', msg: 'Your userdata have been updated' });
  } catch (err) {
    res.status(500).send({ status: 'error', msg: err.message })
  } finally {
    return User.close(connection)
  }
}

module.exports = { handleGetMyData, handleUpdateMyData }