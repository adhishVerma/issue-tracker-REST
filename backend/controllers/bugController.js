const asyncHandler = require("express-async-handler");

// @desc get all open issues
// @route GET /api/bugs
// @access private
const getBugs = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get bugs" });
});

// @desc open new issues
// @route POST /api/bugs
// @access private
const openBug = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length > 0) {
    // register new bug
    return res.status(200).json({ success: true, message: "created bug" });
  }
  res.status(400);
  throw new Error("empty request body");
});

// @desc edit the issues
// @route PUT /api/bugs/:id
// @access private
const updateBug = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update bug ${req.params.id}` });
});

// @desc close issues
// @route POST /api/bugs/:id
// @access private
const closeBug = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete bug ${req.params.id}` });
});

module.exports = { getBugs, openBug, updateBug, closeBug };
