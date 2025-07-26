const { DatabaseConnectivity } = require('../config/DbConnection');
const { DataTypes } = require('sequelize');


const Partner = DatabaseConnectivity.define('Partner', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
  },
  serviceCategory: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  aadharNumber: {
    type: DataTypes.STRING,
  },
  documentUrl: {
    type: DataTypes.STRING, 
  },
  samplePortfolio: {
  type: DataTypes.STRING, 
  allowNull: true,       
  validate: {
    isUrl: true          
  }
},
  status: {
    type: DataTypes.ENUM('pending', 'verified', 'rejected'),
    defaultValue: 'pending',
  },
  adminComment: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'partners',
  timestamps: true,
});

module.exports = Partner;
