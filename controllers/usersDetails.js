
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminUser = require("../models/user");
const sendOtptoMail = require("../services/otpSend");



//Get AllUSers details
const allUsers = asyncHandler(async (req, res) => {
  try {
    const users = await AdminUser.findAll({
      attributes: { exclude: ["password", "accessToken"] }, 
    });
    const totalUsers = await AdminUser.count();

    // Check if any users exist
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    // Success Response
    res.status(200).json({
      message: "Users fetched successfully",
      users,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching Users details:", error.message);
    res.status(500).json({ message: "Server error during fetching users" });
  }
});


// Update User By Admin
const updateUser = asyncHandler(async (req, res) => {
    try {
        const { username, email, phone, role } = req.body;

        // Find the user by email
        const user = await AdminUser.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user fields
        await user.update({
            username: username ?? user.username,
            phone: phone ?? user.phone,
            role: role ?? user.role,
        });

        res.status(200).json({ message: "User updated successfully", user });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//Delete User
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;

        console.log("Request Body:", req.body);

        if (!email) {
            return res.status(400).json({ message: "Email is required to delete user" });
        }

        const user = await AdminUser.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isAdmin) {
            return res.status(403).json({ message: "Admin users cannot be deleted" });
        }

        await AdminUser.destroy({ where: { email } });

        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports={
    allUsers,
    updateUser,
    deleteUser
}