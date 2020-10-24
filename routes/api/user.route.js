// Import needed modules
const express = require("express");
const { verifyUser } = require('../../lib/util/jwt');

// Setup the router
const router = express.Router();

router.get("/myuserdata", (req, res) => verifyUser(req, ['member', 'admin']).then(payload => console.log(payload)))

module.exports = router;
