// Import needed modules
const express = require("express");
const {
  handleGetCodeByUserId,
  handleGetCodeByActiveUserId,
  handleCreateCode,
  handleGetCodeByUsername,
  handleGetCodeByLanguage, 
  handleGetCodeByType,
  handleDeleteCodeById,
} = require("../../controller/code.controller");

const {verifyUser} = require("../../middleware/verifyUser");

// Setup the router
const router = express.Router();

// GET
router.get("/byUserId", (req, res) => verifyUser(req, res, 'member', (payload) => handleGetCodeByUserId(req, res)))
router.get("/byActiveUserId", (req, res) => verifyUser(req, res, 'member', (payload) => handleGetCodeByActiveUserId(req, res, payload)))
router.get("/byUsername", (req, res) => verifyUser(req, res, 'member', (payload) => handleGetCodeByUsername(req, res)))
router.get("/byLanguage", (req, res) => verifyUser(req, res, 'member', (payload) => handleGetCodeByLanguage(req, res)))
router.get("/byType", (req, res) => verifyUser(req, res, 'member', (payload) => handleGetCodeByType(req, res)))

// POST
router.post("/", (req, res) => verifyUser(req, res, 'member', (payload) => handleCreateCode(req, res, payload)))

// DELETE
router.delete("/byId", (req, res) => verifyUser(req, res, 'member', (payload) => handleDeleteCodeById(req, res, payload)));

module.exports = router;
