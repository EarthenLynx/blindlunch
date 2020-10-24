// Import needed modules
const express = require("express");
const { verifyUser } = require('../../lib/util/jwt');
const { handleGetMyData, handleUpdateMyData } = require("../../controller/user.controller")

// Setup the router
const router = express.Router();

// GET Methods
router.get("/myuserdata", (req, res) => verifyUser(req, ['member', 'admin']).then(session => handleGetMyData(req, res, session)))

// Post methods
router.post("/myuserdata", (req, res) => verifyUser(req, ['member', 'admin']).then(session => handleUpdateMyData(req, res, session)))
module.exports = router;
