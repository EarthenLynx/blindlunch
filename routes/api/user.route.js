// Import needed modules
const express = require("express");
const { verifyUser } = require('../../lib/util/jwt');
const { handleGetMyData } = require("../../controller/user.controller")

// Setup the router
const router = express.Router();

router.get("/myuserdata", (req, res) => verifyUser(req, ['member', 'admin']).then(payload => handleGetMyData(req, res, payload)))

module.exports = router;
