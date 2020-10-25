const LunchModel = require("../models/lunch.model");
const { DB_HOST, DB_USERNAME, DB_USER_PASSWORD, DB_DATABASE_NAME } = process.env;
const Lunch = new LunchModel(DB_HOST, DB_USERNAME, DB_USER_PASSWORD, DB_DATABASE_NAME)

const handleFindPartnerInternal = async (req, res, session) => {
  const connection = await Lunch.connect();

  try {
    const partner = await Lunch.findPartnerInternal(connection, session);
    res.status(200).send({ status: 'success', msg: 'Found you a partner', data: partner });
  } catch (err) {
    res.status(500).send({ status: 'error', msg: err.message })
  } finally {
    Lunch.close(connection);
  }
}

module.exports = { handleFindPartnerInternal }