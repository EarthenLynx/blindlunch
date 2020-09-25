// Import needed modules
const express = require("express");
const {
  handleAuthenticate, 
  handleLogin
} = require("../../controller/auth.controller")

// Setup the router
var router = express.Router();

router.post("/authenticate", (req, res) => {
  handleAuthenticate(req, res);
});

router.post('/login', (req, res) => {
  handleLogin(req, res)
})

module.exports = router;
