// Import needed modules
const express = require("express");
const {
  handleGetUserList,
  handleGetUserById,
  handleGetUsersByRole,
  handleCreateUser,
  handleUpdateUserInfo
} = require("../../controller/user.controller")

const { verifyUser } = require("../../middleware/verifyUser");

// Setup the router
const router = express.Router();

// GET
router.get('/all', (req, res) => verifyUser(req, res, 'guest', (payload) => handleGetUserList(req, res)));
router.get('/byId', (req, res) => verifyUser(req, res, 'guest', (payload) => handleGetUserById(req, res)));
router.get('/byRole', (req, res) => verifyUser(req, res, 'guest', (payload) => handleGetUsersByRole(req, res)));

// POST
router.post("/create", (req, res) => handleCreateUser(req, res));

// PUT
router.put("/byId", (req, res) => verifyUser(req, res, 'guest', (payload) => handleUpdateUserInfo(req, res, payload))); 

module.exports = router;
