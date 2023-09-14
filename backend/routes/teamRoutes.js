const express = require('express')
const router = express.Router()
const { editTeam } = require("../controllers/teamController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect)
router.route("/:id").put(editTeam);

module.exports = router;