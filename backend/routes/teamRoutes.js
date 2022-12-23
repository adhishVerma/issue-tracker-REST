const express = require('express')
const router = express.Router()
const { createTeam, editTeam, getTeam, removeTeam } = require("../controllers/teamController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect)
router.route("/").post(createTeam);
router.route("/:id").get(getTeam).put(editTeam).delete(removeTeam);

module.exports = router;