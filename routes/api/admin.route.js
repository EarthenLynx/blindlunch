// Import needed modules
const express = require("express");

const { verifyUser } = require("../../middleware/verifyUser");

// Setup the router
const router = express.Router();

// GET
router.get("/", (req, res) => verifyUser(req, res, 'admin', (payload) => handleGetCompanyList(req, res)));

// POST
router.post("/", (req, res) => verifyUser(req, res, 'admin', (payload) => handleCreateCompany(req, res)));

// PUT
router.put("/", (req, res) => verifyUser(req, res, 'admin', (payload) => handleUpdateCompany(req, res)))

// DELETE
router.delete("/", (req, res) => verifyUser(req, res, 'admin', (payload) => handleDeleteCompany(req, res)));

module.exports = router;
