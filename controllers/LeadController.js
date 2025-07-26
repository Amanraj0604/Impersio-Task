const asyncHandler = require('express-async-handler');
const Lead = require('../models/Lead');
const Partner = require('../models/partner');
const PartnerLead = require('../models/PartnerLead');
const { Op } = require('sequelize');

const postLead = asyncHandler(async (req, res) => {
  const { category, date, budget, city, referenceImageUrl } = req.body;
  const { email, phone, username } = req.user;

  if (!category || !date || !budget || !city) {
    return res.status(400).json({
      message: 'All required fields (category, date, budget, city) must be provided.'
    });
  }

  // Create lead
  const newLead = await Lead.create({
    category,
    date,
    budget,
    city,
    referenceImageUrl
  });

  // Fetch all partners
 const matchedPartners = await Partner.findAll({
  where: {
    [Op.or]: [
      { serviceCategory: category },
      { city: city }
    ]
  },
  attributes: ['id', 'fullName', 'email', 'serviceCategory', 'city']
});
  // If no partners found
  if (!matchedPartners || matchedPartners.length === 0) {
    return res.status(201).json({
      message: 'Lead submitted, but no matching partners found.',
      data: newLead
    });
  }

  // Create entries in PartnerLead table for all matching partners
  const partnerLeadData = matchedPartners.map(partner => ({
    clientName: username,
    clientEmail: email,
    clientPhone: phone,
    category,
    city,
    partnerId: partner.id,
    partnerName: partner.fullName,
    partnerEmail: partner.email,
    status: 'new'
  }));

  await PartnerLead.bulkCreate(partnerLeadData);

  res.status(201).json({
    message: 'Lead submitted successfully and matched with partners.',
    lead: newLead,
    matchedPartnersCount: matchedPartners.length
  });
});

module.exports = {
  postLead
};
