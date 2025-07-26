const asyncHandler = require("express-async-handler");
const TemporaryUserModel = require("../models/TempUser");
require('dotenv').config();


// Get all temporary users
const getAllTemporaryUsers = asyncHandler(async (req, res) => {
  try {
    const users = await TemporaryUserModel.findAll();

    const formattedUsers = users.map(user => {
      const { username, email, phone, role, status, createdAt } = user;


      if (status === 'rejected') {
        return {
          username,
          email,
          phone,
          role,
          status,
          createdAt,
          note: "This user has been rejected"
        };
      }

      const verificationLink = `${process.env.APP_URL}signup-verify?userEmail=${encodeURIComponent(email)}`;
      const RejectionLink = `${process.env.APP_URL2}reject-user?userEmail=${encodeURIComponent(email)}`;

      return {
        username,
        email,
        phone,
        role,
        status,
        createdAt,
        verificationLink,
        RejectionLink,
        note: "Click the above links to either verify or reject this user"
      };
    });

    res.status(200).json({
      success: true,
      count: formattedUsers.length,
      users: formattedUsers,
    });
  } catch (error) {
    console.error("Error fetching temporary users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve temporary users",
    });
  }
});


// Reject the user 
const updateStatusToRejected = asyncHandler(async (req, res, next) => {
  const userEmail = req.query.userEmail;

  if (!userEmail) {
    return next(createError(400, "User email is required in query params"));
  }

  try {
    const user = await TemporaryUserModel.findOne({ where: { email: userEmail } });

    if (!user) {
      return next(createError(404, "User not found in temporary records"));
    }

    if (user.status !== 'pending') {
      return next(createError(400, `Cannot reject a user whose status is '${user.status}'`));
    }

    user.status = 'rejected';
    await user.save();

    // Optional: You can call a rejection mail service here if needed
    // await rejectedUserMail(user);

    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>User Rejected</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: white;
                  text-align: center;
              }
              .container {
                  margin-top: 5%;
              }
              h1 {
                  color: red;
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
                  background-color: rgb(97, 13, 17);
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>User Rejected</h1>
              <p>User Name: ${user.username}</p>
              <p>User Email: ${user.email}</p>
              <a href="/login">Back to Login</a>
          </div>
      </body>
      </html>
    `);

  } catch (error) {
    console.error("Error rejecting user:", error);
    return next(createError(500, "Server error while rejecting the user"));
  }
});




module.exports = {
  getAllTemporaryUsers,
  updateStatusToRejected
};
