const express = require("express");
const { verifyTokenAndClient } = require("../middlewares/verifyToken");
const { postLead } = require("../controllers/LeadController");
const router = express.Router();

router.post("/inquiry",verifyTokenAndClient,postLead);

module.exports = router;