
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminUser = require("../models/user");
const sendOtptoMail = require("../services/otpSend");


let randomNumber=null;

// Validate Password
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
}

// Login user
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const login_user = await AdminUser.findOne({ where: { email } });

    if (!login_user) {
      return res.status(401).json({ message: "Invalid User" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, login_user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Password is Incorrect" });
    }

    const accessToken = jwt.sign(
      {
        user: {
          id: login_user.userId,
          email: login_user.email,
          username: login_user.username,
          phone: login_user.phone,
          role: login_user.role
        }
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    const { password: _, ...userDetails } = login_user.dataValues;

    res.status(200).json({
      message: "Login successful",
      user: userDetails,
      accessToken,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});



//Forgot password
const sendOtpByMail = asyncHandler(async (req, res) => {
    try {
        // Find user by email
        const ForgotEmail = await AdminUser.findOne({
            where: {
                email: req.body.email,
            },
        });
 
        // Check if the user exists
        if (!ForgotEmail) {
            return res.status(401).json({ message: "Invalid User" });
        }
 
        // Generate a random OTP
        const generateRandomNumber = () => {
            return Math.floor(100000 + Math.random() * 900000); 
        };
 
        randomNumber = generateRandomNumber(); 
        console.log(randomNumber);
 
        // Send OTP to email
        await sendOtptoMail(randomNumber, ForgotEmail.email); 
 
        // Send success response
        res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        console.error("Forgot password error:", error); // Updated error log message
        res.status(500).json({ message: "An error occurred during the process" }); // General error response
    }
 });

//  Update Password
 const updatePasswordafterOTPverification = asyncHandler(async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        // Check if all required fields are provided
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate the email exists in the database
        const verifyEmail = await AdminUser.findOne({
            where: {
                email: email,
            },
        });
        if (!verifyEmail) {
            return res.status(401).json({ message: "Invalid Email" });
        }

        // Verify the OTP
        // console.log(randomNumber);
        // console.log(typeof(otp));
        if (Number(otp) !== randomNumber) { 
            return res.status(400).json({ message: "Invalid OTP" });
        }


        // Validate the new password
       
        if (!validatePassword(newPassword)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character",
            });
        }

        // Hash the new password (ensure you have bcrypt installed)
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);

        const updatedRows = await AdminUser.update(
            {
                password: hash, 
            },
            {
                where: {
                    email:email , 
                },
            }
        );
        if (updatedRows[0] > 0) {
            // console.log("Password updated successfully");
            res.status(200).json({ message: "Password updated successfully" });
        } 
        
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "An error occurred while updating the password" });
    }
});

module.exports = {
  loginUser,
  sendOtpByMail,
  updatePasswordafterOTPverification
};
