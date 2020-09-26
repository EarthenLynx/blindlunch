// Import needed modules
const express = require("express");
const {
  handleGetCodeByUserId,
  handleCreateCode,
  handleGetCodeByUsername,
  // handleGetCode,
  // handleGetCodeById,
  // handleDeleteCodeById,
  // handleUpdateCodeById
} = require("../../controller/code.controller");

const {verifyUser} = require("../../middleware/verifyUser");

// Setup the router
var router = express.Router();

router.get("/byUserId", (req, res) => verifyUser(req, res, 'member', (payload) => handleGetCodeByUserId(req, res)))
router.get("/byUsername", (req, res) => verifyUser(req, res, 'member', (payload) => handleGetCodeByUsername(req, res)))
// router.get('/:id', (req, res) => {
//   handleGetCodeById(req, res)
// })

router.post("/", (req, res) => verifyUser(req, res, 'member', (payload) => handleCreateCode(req, res, payload)))

// router.delete("/:id", (req, res) => {
//   handleDeleteCodeById(req, res);
// })

// router.put("/:id", (req, res) => {
//   handleUpdateCodeById(req, res);
// })

module.exports = router;
