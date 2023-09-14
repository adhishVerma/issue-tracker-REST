const express = require("express");
const router = express.Router();
const {
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getProjects,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");


router.route("/").post(createProject).get(protect, getProjects);
router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);

module.exports = router;
