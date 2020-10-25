const jwt = require("jsonwebtoken");

// Include classes to be used
const AuthModel = require("../models/auth.model");
const Nodekeeper = require("../lib/class/nodekeeper");

// Initialize the Auth Model
const { DB_HOST, DB_USERNAME, DB_USER_PASSWORD, DB_DATABASE_NAME } = process.env;
const Auth = new AuthModel(DB_HOST, DB_USERNAME, DB_USER_PASSWORD, DB_DATABASE_NAME);

// Include util functions
const { getAuthtokenFrom, verifyAudience } = require("../lib/util/jwt");

const handleSignup = async (req, res) => {
  const userDetails = req.body;

  const connection = await Auth.connect()
  // TODO: If one or more input variables cannot be verified, there will still be a success message
  const response = await Auth.signup(connection, userDetails).catch(err => new Error(err));
  if (Auth.hasErrAt(response)) {
    await res.status(500).send({ status: 'error', msg: `An error occured while trying to signup: ${response.sqlMessage}` })
  } else {
    await res.status(201).send({ status: 'success', msg: 'User successfully created. You may now login' })
  }
  Auth.close(connection)
}

const handleAuthenticate = async (req, res) => {
  const userDetails = req.body;

  const connection = await Auth.connect();

  // Look for a user in the database and return it if there is one
  const user = await Auth.authenticate(connection, userDetails).catch(err => new Error(err));
  if (!user.exists || !user.authenticated) {
    res.status(404).send({ status: 'not-found', msg: 'User - password combination not found' })
  }

  // If user was found, sign a json webtoken and allow the user to login
  else {
    const n = new Nodekeeper();
    const pair = await n.set(20)
    const secret = process.env.SECRET;
    const id = user.id;
    const options = {
      audience: req.ip,
      issuer: process.env.HOST,
      expiresIn: '1m'
    }
    const payload = { id, pair }
    const token = jwt.sign(payload, secret, options);
    res.cookie(process.env.AUTH_TOKENNAME, token).status(200).send({ status: 'success', msg: 'User found. You may now login', token })
  }
  return Auth.close(connection)
}

const handleLogin = async (req, res) => {
  const connection = await Auth.connect();

  const incomingToken = getAuthtokenFrom(req);
  const secret = process.env.SECRET;
  let incomingPayload = {};

  // Start to verify the users integrity
  // 1. Verify the token
  try {
    incomingPayload = jwt.verify(incomingToken, secret)
  } catch (err) {
    await Auth.close(connection)
    return res.status(403).send({ status: 'forbidden', msg: "Your token is either expired or invalid. Try logging in again" });
  }

  // 2. Compare the jwt variables with those in the process
  const n = new Nodekeeper();
  const { key, value } = incomingPayload.pair;

  try {
    n.compare(key, value)
  } catch (err) {
    await Auth.close(connection)
    return res.status(403).send({ status: 'forbidden', msg: "Your integrity could not be verified" })
  }
  n.destroy(key);

  // 3. Make sure the jwt comes from the same IP adress to which it was issued
  const sameIp = verifyAudience(req, incomingPayload)
  if (!sameIp) {
    return res.status(403).send({ status: 'forbidden', msg: "Your IP could not be verified" })
  }

  // If integrity can be verified, continue
  const { id } = incomingPayload;
  const user = await Auth.login(connection, id);
  const options = {
    audience: req.ip,
    issuer: process.env.HOST,
    expiresIn: '4h'
  }

  const token = jwt.sign({ ...user }, secret, options)
  res.cookie(process.env.USER_TOKENNAME, token).status(200).send({ status: 'success', msg: 'You are now logged in', token })
  return Auth.close(connection)
}

const handleUpdateMyPassword = async (req, res, session) => {
  const connection = await Auth.connect();
  const payload = req.body;

  try {
    const success = await Auth.updateMyPassword(connection, session, payload)
    res.status(201).send({ status: 'success', msg: 'Your password has been successfully updated' })
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 'error', msg: err.message })
  } finally {
    return Auth.close(connection)
  }
}

module.exports = { handleSignup, handleAuthenticate, handleLogin, handleUpdateMyPassword }