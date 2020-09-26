// Import needed modules
const express = require("express");
const {
  handleCreateRole,
  handleDeleteRoleById,
  handleGetRoleList,
} = require("../../controller/roles.controller");

const {verifyUser} = require("../../middleware/verifyUser");

// Setup the router
var router = express.Router();

// GET
router.get("/", (req, res) => verifyUser(req, res, 'admin', (payload) => handleGetRoleList(req, res)));

// POST
router.post("/", (req, res) => verifyUser(req, res, 'admin', (payload) => handleCreateRole(req, res)));

// DELETE
router.delete("/", (req, res) => verifyUser(req, res, 'admin', (payload) => handleDeleteRoleById(req, res)));

module.exports = router;
