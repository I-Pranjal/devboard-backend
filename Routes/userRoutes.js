const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserDetails,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/update", updateUserDetails );
router.post("/login", loginUser);
router.get("/me", protect, getUserProfile);

module.exports = router;
