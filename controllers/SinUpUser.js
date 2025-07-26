const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const sendAdminVerificationEmail = require("../services/semdAdminVerificationEmail");
const verifyedUserMail = require("../services/verifyUserMail");
const TemporaryUserModel = require("../models/TempUser");
const AdminUser = require("../models/user");


// Validate email
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Validate Password
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
}
// Validate Phone
const validatePhone = (phone) => {
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
    return phoneRegex.test(phone);
};


// Temp User Registration
const tempRegisterUser = asyncHandler(async (req, res) => {
    try {
        const { username, email, phone, password, role } = req.body;

        // Basic validations
        if (!username || !email || !phone || !password || !role) {
            return res.status(400).json({ message: "All fields are required including role" });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                message:
                    "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character",
            });
        }

        if (!validatePhone(phone)) {
            return res.status(400).json({ message: "Invalid phone number format" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        if (role === "client") {
            // Save client directly in AdminUser table
            try {
                const user = await AdminUser.create({
                    username,
                    email,
                    phone,
                    password: hash,
                    emailVerified: true,
                    role: "client",
                });

                return res.status(201).json({
                    message: "Client registered successfully and verified.",
                });
            } catch (err) {
                console.error("Sequelize AdminUser create error:", JSON.stringify(err, null, 2));
                return res.status(400).json({
                    message: err.errors?.[0]?.message || "Validation failed",
                });
            }
        } else {
            //Save admin or partner in temporary table
            try {
                const newTempUser = await TemporaryUserModel.create({
                    username,
                    email,
                    phone,
                    password: hash,
                    isVerified: false,
                    role,
                });

                try {
                    await sendAdminVerificationEmail(newTempUser);
                } catch (emailErr) {
                    console.error(" Error sending verification email:", emailErr.message);
                }

                return res.status(201).json({
                    message: "User registered successfully and is awaiting admin verification.",
                });
            } catch (err) {
                console.error("Sequelize TemporaryUserModel create error:", JSON.stringify(err, null, 2));
                return res.status(400).json({
                    message: err.errors?.[0]?.message || "Validation failed",
                });
            }
        }
    } catch (error) {
        console.error("Error during user registration:", error.message);
        return res.status(500).json({ message: "Server error during user registration." });
    }
});




// Verify user by Auth-user
const verifyUser = asyncHandler(async (req, res, next) => {
    const tempUserEmail = req.query.userEmail;
    if (!tempUserEmail) {
        return next(createError(400, "Temporary User email is required"));
    }
    try {
        const tempUser = await TemporaryUserModel.findOne({ where: { email: tempUserEmail } });
        console.log(tempUser);

        if (!tempUser) {
            return next(createError(404, "User not found in temporary records"));
        }

        // Move data to the UserModel
        const verifiedUser = await AdminUser.create({
            username: tempUser.username,
            email: tempUser.email,
            phone: tempUser.phone,
            password: tempUser.password,
            emailVerified: true,
            role: tempUser.role,
        });

        // console.log(verifiedUser);

        const user = tempUserEmail;

        await verifyedUserMail(verifiedUser);

        await TemporaryUserModel.destroy({ where: { email: tempUserEmail } });



        res.status(200).send(`
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>User Verified</title>
                    <style>
                        /* Optional: Adding some basic styles */
                        body {
                            font-family: Arial, sans-serif;
                            background-color:white;
                            text-align: center;
                        }
                        .container {
                            margin-top: 5%;
                        }
                        h1 {
                            color: green;
                        }
                        a {
                            display: inline-block;
                            margin-top: 20px;
                            padding: 10px 20px;
                            background-color: black;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                        a:hover {
                            background-color:rgb(97, 13, 17);
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>User Verified Successfully</h1>
                        <p>User Name: ${verifiedUser.username}</p>
                        <p>User Email: ${verifiedUser.email}</p>
                        <a href="/login">Go to Login Page</a>
                    </div>
                </body>
                </html>

            `);

    } catch (error) {
        console.error('Error verifying user:', error);

    }
});

module.exports = {
    tempRegisterUser,
    verifyUser
};
