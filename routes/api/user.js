// Import needed modules
const express = require("express");
const { handleGetUserList, handleCreateUser, handleGetUserbyId, handleUpdateUserById } = require("../../controller/user.controller")

// Setup the router
var router = express.Router();

// router.get('/', (req, res, next) => {
//   handleGetUserList(req, res, next);
// })

// router.get('/:id', (req, res, next) => {
//   handleGetUserbyId(req, res, next)
// })

router.post("/", (req, res, next) => {
  handleCreateUser(req, res, next);
});

// router.put("/:id", (req, res, next) => {
//   handleUpdateUserById(req, res, next);
// })

module.exports = router;
