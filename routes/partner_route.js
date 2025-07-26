const express = require("express");
const { PartnerPortfolio, getPartnerLeads, updateLeadStatus } = require("../controllers/Partner");
const { verifyTokenAndPartner } = require("../middlewares/verifyToken");
const router = express.Router();

// partner portfolio route
router.post('/portfolio',verifyTokenAndPartner,PartnerPortfolio);
router.get('/leads',verifyTokenAndPartner,getPartnerLeads);
router.put('/update-leads',verifyTokenAndPartner,updateLeadStatus);


module.exports = router;