// Import needed modules
const express = require("express");
const {
  // handleGetCode,
  handleCreateRole,
  // handleGetCodeById,
  handleDeleteRoleById,
  // handleUpdateCodeById 
} = require("../../controller/roles.controller");

// Setup the router
var router = express.Router();

// router.get("/", (req, res) => {
//   handleGetCode(req, res);
// })

router.post("/", (req, res) => {
  handleCreateRole(req, res);
})

router.delete("/", (req, res) => {
  handleDeleteRoleById(req, res);
})



module.exports = router;
