// Import needed modules
const express = require("express");
const { 
  handleGetUserList, 
  handleCreateUser, 
  handleGetUserById, 
  handleGetUsersByRole,
  // handleUpdateUserById
 } = require("../../controller/user.controller")

// Setup the router
var router = express.Router();

router.get('/all', (req, res) => {
  handleGetUserList(req, res);
})

router.get('/byId', (req, res) => {
  handleGetUserById(req, res);
})

router.get('/byRole', (req, res) => {
  handleGetUsersByRole(req, res);
})

router.post("/create", (req, res) => {
  handleCreateUser(req, res);
});

// router.put("/:id", (req, res) => {
//   handleUpdateUserById(req, res);
// })

module.exports = router;
