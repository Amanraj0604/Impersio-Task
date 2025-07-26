const express = require("express");
const { getAllTemporaryUsers, updateStatusToRejected } = require("../controllers/AdminTask");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const router = express.Router();


router.get("/verifications",verifyTokenAndAdmin, getAllTemporaryUsers);
router.get('/reject-user', updateStatusToRejected);

module.exports = router;
