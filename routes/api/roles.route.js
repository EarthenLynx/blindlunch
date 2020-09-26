// Import needed modules
const express = require("express");
const {
  handleCreateRole,
  handleDeleteRoleById,
} = require("../../controller/roles.controller");

// Setup the router
var router = express.Router();

// POST
router.post("/", (req, res) => handleCreateRole(req, res))

// DELETE
router.delete("/", (req, res) => handleDeleteRoleById(req, res))

module.exports = router;
