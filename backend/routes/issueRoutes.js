const express = require("express");
const router = express.Router();
const {
  getBugs,
  openBug,
  updateBug,
  deleteBug,
} = require("../controllers/issueController");

router.route("/").get(getBugs).post(openBug);
router.route("/:id").put(updateBug).delete(deleteBug);

module.exports = router;
