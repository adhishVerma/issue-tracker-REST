const asyncHandler = require("express-async-handler");
const Issue = require("../models/issueModel");

// @desc get all open issues
// @route GET /api/bugs
// @access private
const getBugs = asyncHandler(async (req, res) => {
  const issues = await Issue.find();
  res.status(200).json(issues);
});

// @desc open new issues
// @route POST /api/bugs
// @access private
const openBug = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length > 0) {
    // register new bug
    const new_issue = await Issue.create({
      name: req.body.name,
      team: req.body.team,
      project: req.body.project,
      status: req.body.status,
      desc: req.body.desc,
    });
    return res.status(200).json(new_issue);
  }
  res.status(400);
  throw new Error("empty request body");
});

// @desc edit the issues
// @route PUT /api/bugs/:id
// @access private
const updateBug = asyncHandler(async (req, res) => {
  const bug = await Issue.findById(req.params.id);
  if (!bug) {
    res.status(400);
    throw new Error("issue not found");
  }
  const updatedBug = await Issue.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res
    .status(200)
    .json({ message: `Update bug ${req.params.id}`, issue: updatedBug });
});

// @desc close issues
// @route POST /api/bugs/:id
// @access private
const deleteBug = asyncHandler(async (req, res) => {
  const bug = await Issue.findById(req.params.id);
  if (!bug) {
    res.status(400);
    throw new Error("issue not found");
  }
  await bug.remove();
  res.status(200).json({ message: `Delete bug ${req.params.id}` });
});

module.exports = { getBugs, openBug, updateBug, deleteBug };
