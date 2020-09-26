// Import needed modules
const express = require("express");
const {
  handleGetCodeByUserId,
  handleCreateCode,
  handleGetCodeByUsername,
  handleGetCodeByLanguage, 
  handleGetCodeByType,
} = require("../../controller/code.controller");

const {verifyUser} = require("../../middleware/verifyUser");

// Setup the router
var router = express.Router();

router.get("/byUserId", (req, res) => verifyUser(req, res, 'member', (payload) => handleGetCodeByUserId(req, res)))
router.get("/byUsername", (req, res) => verifyUser(req, res, 'member', (payload) => handleGetCodeByUsername(req, res)))
router.get("/byLanguage", (req, res) => verifyUser(req, res, 'member', (payload) => handleGetCodeByLanguage(req, res)))
router.get("/byType", (req, res) => verifyUser(req, res, 'member', (payload) => handleGetCodeByType(req, res)))

router.post("/", (req, res) => verifyUser(req, res, 'member', (payload) => handleCreateCode(req, res, payload)))


module.exports = router;
