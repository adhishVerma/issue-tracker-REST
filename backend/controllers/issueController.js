const asyncHandler = require("express-async-handler");
const Issue = require("../models/issueModel");
const User = require("../models/userModel");
const Project = require('../models/projectModel');

// @desc get all open issues of some project
// @route GET /api/bugs/:id
// @access private
const getBugs = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const project = await Project.findById(projectId).lean();
  if(project){
    // find all the issues and populate them
    let issues = []
    // for of loop to fetch the individual project
    for(let issue of project.issues){
      let issueData = await Issue.findById(issue).lean();
      const user = await User.findById(issueData.user);
      issueData = {...issueData, user : user.name}
      issues.push(issueData);
    }
    res.status(200).json({issues : issues, name : project.name});
  }else{
    res.status(400).json({success : false});
  }
});

// @desc open new issues
// @route POST /api/bugs
// @access private
const openBug = asyncHandler(async (req, res) => {

    // register new bug
    const new_issue = await Issue.create({
      name: req.body.issueName,
      projectId: req.body.projectId,
      priority : req.body.priority,
      type: req.body.taskType,
      desc: req.body.description,
      user : req.body.userId,
      status : 'open'
    });
    // find the project
    const project = await Project.findById(req.body.projectId);
    // push the issue to issues array
    project.issues.push(new_issue._id)
    // save the project 
    project.save();
    
    if(new_issue && project){
      return res.status(200).json({success:true});
    }else{
      res.status(400).json({success : false, message : "Empty req body"});
      throw new Error("empty request body");
    }
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
    .json({ success : true ,message: `Update bug ${req.params.id}`, issue: updatedBug });
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
  // remove the bug from project document
  const project = await Project.findById(bug.projectId);
  project.issues = project.issues.filter((item) => item.toString() !== req.params.id);
  await project.save();

  // remove the bug
  await bug.remove();
  res.status(200).json({success : true,  message: `Delete bug ${req.params.id}` });
});

// @desc get single issue
// @route POST /api/issues/:id
// @access private
const getBug = asyncHandler(async(req,res) => {
  const issueId = req.params.id;
  let issue = await Issue.findById(issueId).lean();
  const user = await User.findById(issue.user);
  issue = {...issue, user : user.name}
  if(issue){
    res.status(200).json({success : true, issue : issue})
  }else{
    res.status(404).json({success : false});
  }
})

module.exports = { getBugs, openBug, updateBug, deleteBug, getBug };
