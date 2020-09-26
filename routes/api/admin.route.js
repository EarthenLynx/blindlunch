// Import needed modules
const express = require("express");
const {
  handleCreateRole,
  handleDeleteRoleById,
  handleGetRoleList,
  handleCreateCodetype,
  handleGetCodetypeList,
  handleDeleteCodetypeById,
} = require("../../controller/admin.controller");

const {verifyUser} = require("../../middleware/verifyUser");

// Setup the router
var router = express.Router();

// GET
router.get("/role", (req, res) => verifyUser(req, res, 'admin', (payload) => handleGetRoleList(req, res)));
router.get("/codetype", (req, res) => verifyUser(req, res, 'admin', (payload) => handleGetCodetypeList(req, res)));


// POST
router.post("/role", (req, res) => verifyUser(req, res, 'admin', (payload) => handleCreateRole(req, res)));
router.post("/codetype", (req, res) => verifyUser(req, res, 'admin', (payload) => handleCreateCodetype(req, res)))

// DELETE
router.delete("/role", (req, res) => verifyUser(req, res, 'admin', (payload) => handleDeleteRoleById(req, res)));
router.delete("/codetype", (req, res) => verifyUser(req, res, 'admin', (payload) => handleDeleteCodetypeById(req, res)));

module.exports = router;
