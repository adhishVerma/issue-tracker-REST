const express = require("express");
const router = express.Router();
const {
  addUser,
  loginUser,
  getUser,
  removeUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(addUser).delete(protect, removeUser);
router.get("/me", protect, getUser);
router.route("/login").post(loginUser);

module.exports = router;
