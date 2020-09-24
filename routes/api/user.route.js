// Import needed modules
const express = require("express");
const { 
  handleGetUserList, 
  handleCreateUser, 
  // handleGetUserbyId, 
  // handleUpdateUserById
 } = require("../../controller/user.controller")

// Setup the router
var router = express.Router();

router.get('/', (req, res) => {
  handleGetUserList(req, res);
})

router.post("/create", (req, res) => {
  handleCreateUser(req, res);
});

// router.put("/:id", (req, res) => {
//   handleUpdateUserById(req, res);
// })

module.exports = router;
