// Import needed modules
const express = require("express");
const { verify } = require("jsonwebtoken");
const {
  handleCreateRole,
  handleDeleteRoleById,
  handleGetRoleList,
  handleCreateCodetype,
  handleGetCodetypeList,
  handleDeleteCodetypeById,
  handleCreateCodelanguage,
  handleGetCodelanguageList,
  handleDeleteCodelanguageById,
  handleAddUserRole, 
  handleDeleteUserRole,
  handleDeleteUserById
} = require("../../controller/admin.controller");

const { verifyUser } = require("../../middleware/verifyUser");

// Setup the router
const router = express.Router();

// GET
router.get("/role", (req, res) => verifyUser(req, res, 'admin', (payload) => handleGetRoleList(req, res)));
router.get("/codetype", (req, res) => verifyUser(req, res, 'admin', (payload) => handleGetCodetypeList(req, res)));
router.get("/codelanguage", (req, res) => verifyUser(req, res, 'admin', (payload) => handleGetCodelanguageList(req, res)));

// POST
router.post("/role", (req, res) => verifyUser(req, res, 'admin', (payload) => handleCreateRole(req, res)));
router.post("/codetype", (req, res) => verifyUser(req, res, 'admin', (payload) => handleCreateCodetype(req, res)))
router.post("/codelanguage", (req, res) => verifyUser(req, res, 'admin', (payload) => handleCreateCodelanguage(req, res)))

// PUT
router.put("/userrole", (req, res) => verifyUser(req, res, 'admin', (payload) => handleAddUserRole(req, res)))

// DELETE
router.delete("/role", (req, res) => verifyUser(req, res, 'admin', (payload) => handleDeleteRoleById(req, res)));
router.delete("/codetype", (req, res) => verifyUser(req, res, 'admin', (payload) => handleDeleteCodetypeById(req, res)));
router.delete("/codelanguage", (req, res) => verifyUser(req, res, 'admin', (payload) => handleDeleteCodelanguageById(req, res)));
router.delete("/userrole", (req, res) => verifyUser(req, res, 'admin', (payload) => handleDeleteUserRole(req, res)))
router.delete("/user", (req, res) => verifyUser(req, res, 'admin', (payload) => handleDeleteUserById(req, res)))

module.exports = router;
