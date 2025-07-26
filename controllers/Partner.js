const asyncHandler = require('express-async-handler');
const Partner = require('../models/partner');
const AdminUser = require('../models/user');
const PartnerLead = require('../models/PartnerLead');

// Create a partner Portfolio if partner is registered
const PartnerPortfolio = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phone,
    serviceCategory,
    city,
    aadharNumber,
    documentUrl,
    samplePortfolio
  } = req.body;

  
  const adminUser = await AdminUser.findOne({
    where: { email, role: 'partner' }
  });

  if (!adminUser) {
    return res.status(400).json({
      message: 'You are not the registered partner '
    });
  }

  const partner = await Partner.create({
    fullName,
    email,
    phone,
    serviceCategory,
    city,
    aadharNumber,
    documentUrl,
    samplePortfolio
  });

  res.status(201).json({
    message: 'Portfolio Added Succefully',
    data: partner
  });
});


// Partner Leads
const getPartnerLeads = asyncHandler(async (req, res) => {
  const partnerEmail = req.user.email;

  if (!partnerEmail) {
    return res.status(400).json({ message: 'Partner email not found in request.' });
  }

  const leads = await PartnerLead.findAll({
    where: { partnerEmail },
    order: [['createdAt', 'DESC']]
  });

  res.status(200).json({
    success: true,
    count: leads.length,
    data: leads
  });
});

// Update leads status
const updateLeadStatus = asyncHandler(async (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ success: false, message: "ID and status are required" });
  }

  const validStatuses = ["new", "responded", "booked", "closed"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status value" });
  }

  const lead = await PartnerLead.findByPk(id);

  if (!lead) {
    return res.status(404).json({ success: false, message: "Lead not found" });
  }

  lead.status = status;
  await lead.save();

  res.status(200).json({
    success: true,
    message: `Lead status updated to "${status}"`,
    updatedLead: lead,
  });
});


module.exports = {
  PartnerPortfolio,
  getPartnerLeads,
  updateLeadStatus
};
