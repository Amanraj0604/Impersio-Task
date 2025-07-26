const express = require("express");
const { tempRegisterUser, verifyUser } = require("../controllers/SinUpUser");
const { loginUser, sendOtpByMail, updatePasswordafterOTPverification } = require("../controllers/SignInUser");
const { allUsers, updateUser, deleteUser } = require("../controllers/usersDetails");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const router = express.Router();

//user routes
router.post("/signup",tempRegisterUser);
router.get("/signup-verify",verifyUser);
router.get("/login",loginUser);
router.post("/send-otp",sendOtpByMail);
router.put("/update-password",updatePasswordafterOTPverification);

// Admin Routes
router.get("/all-users",verifyTokenAndAdmin,allUsers)
router.put("/update-user",verifyTokenAndAdmin,updateUser)
router.put("/delete-user",verifyTokenAndAdmin,deleteUser)


module.exports = router; 