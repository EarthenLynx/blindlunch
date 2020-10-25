// Import needed modules
const express = require("express");
const { verifyUser } = require('../../lib/util/jwt');
const { handleFindPartnerInternal } = require("../../controller/lunch.controller")

// Setup the router
const router = express.Router();

// GET Methods
router.get("/find/internal", (req, res) => verifyUser(req, ['member', 'admin']).then(session => handleFindPartnerInternal(req, res, session)))

module.exports = router;
