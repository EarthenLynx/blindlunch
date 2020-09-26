// Import needed modules
const express = require("express");
const { 
  handleGetUserList, 
  handleGetUserById, 
  handleGetUsersByRole,
  handleCreateUser, 
  handleUpdateUserById
 } = require("../../controller/user.controller")

// Setup the router
var router = express.Router();

// GET
router.get('/all', (req, res) => handleGetUserList(req, res));
router.get('/byId', (req, res) => handleGetUserById(req, res));
router.get('/byRole', (req, res) => handleGetUsersByRole(req, res));

// POST
router.post("/create", (req, res) => handleCreateUser(req, res));

// PUT
router.put("/byId", (req, res) => handleUpdateUserById(req, res));

module.exports = router;
