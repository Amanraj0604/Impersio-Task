const { DatabaseConnectivity } = require('../config/DbConnection');
const { DataTypes } = require('sequelize');

const AdminUser = DatabaseConnectivity.define("users", {
    userId: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
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
    emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'client', 'partner'),
        allowNull: false,
    }
}, {
    timestamps: true, 
});

module.exports = AdminUser;
