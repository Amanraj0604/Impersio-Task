const { DatabaseConnectivity } = require("../config/DbConnection");
const { DataTypes } = require("sequelize");

const TemporaryUserModel = DatabaseConnectivity.define(
  "TemporaryUser",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'client', 'partner'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'verified', 'rejected'),
      defaultValue: 'pending',
      allowNull: false,
    }
  },
  {
    timestamps: true,
    tableName: "temporary_users",
  }
);

module.exports = TemporaryUserModel;
