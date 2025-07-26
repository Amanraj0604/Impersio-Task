// config/DBconnection.js
require('dotenv').config();
const Sequelize = require('sequelize');

// Validate environment variables
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT'];
requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(`Missing environment variable: ${envVar}`);
    }
});

// Create a Sequelize instance
const DatabaseConnectivity = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        dialect: 'mysql',
    }
);

// Test the connection
const connect = async () => {
    try {
        await DatabaseConnectivity.authenticate();
        console.log("Connected to MySQL database");
        await DatabaseConnectivity.sync({ force: false }); 
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Error connecting to MySQL database:", error.message);
        throw error;
    }
};

module.exports = { connect, DatabaseConnectivity };
