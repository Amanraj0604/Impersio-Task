const { DataTypes } = require('sequelize');
const { DatabaseConnectivity } = require('../config/DbConnection');

const Lead = DatabaseConnectivity.define('Lead', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  category: {
    type: DataTypes.ENUM('wedding', 'maternity', 'birthday', 'event', 'other'),
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  budget: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  referenceImageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  }
}, {
  tableName: 'Lead', 
});

module.exports = Lead;
