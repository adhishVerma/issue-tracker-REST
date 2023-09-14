const express = require("express");
const router = express.Router();
const {
  getBugs,
  openBug,
  updateBug,
  deleteBug,
  getBug
} = require("../controllers/issueController");

router.route("/").post(openBug);
router.route('/project/:id').get(getBugs)
router.route("/:id").put(updateBug).delete(deleteBug).get(getBug)

module.exports = router;
