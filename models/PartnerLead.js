const { DataTypes } = require('sequelize');
const { DatabaseConnectivity } = require('../config/DbConnection');

const PartnerLead = DatabaseConnectivity.define('PartnerLead', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  // Client details
  clientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clientEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  clientPhone: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // Inquiry details
  category: {
    type: DataTypes.ENUM('wedding', 'maternity', 'birthday', 'event', 'other'),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // Partner details
  partnerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  partnerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  partnerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  // Status
  status: {
    type: DataTypes.ENUM('new', 'responded', 'booked', 'closed'),
    defaultValue: 'new'
  }
}, {
  tableName: 'PartnerLeads',
  timestamps: true
});

module.exports = PartnerLead;
