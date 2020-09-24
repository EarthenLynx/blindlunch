// Import needed modules
const express = require("express");
const {
  // handleGetCode,
  handleCreateRole,
  // handleGetCodeById,
  // handleDeleteCodeById,
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

// router.delete("/:id", (req, res) => {
//   handleDeleteCodeById(req, res);
// })

// router.put("/:id", (req, res) => {
//   handleUpdateCodeById(req, res);
// })

module.exports = router;
