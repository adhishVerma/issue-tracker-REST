const express = require("express");
const router = express.Router();
const {
  createProject,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

router.route("/").post(createProject);
router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);

module.exports = router;
