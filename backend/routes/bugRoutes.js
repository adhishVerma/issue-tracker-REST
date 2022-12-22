const express = require("express");
const router = express.Router();
const {
  getBugs,
  openBug,
  updateBug,
  closeBug,
} = require("../controllers/bugController");

router.route("/").get(getBugs).post(openBug);
router.route("/:id").put(updateBug).delete(closeBug);

module.exports = router;
