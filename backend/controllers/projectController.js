const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");
const User = require('../models/userModel');

// @desc Create a project
// @route POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  // create project
  // const find user by id
  const user = await User.findById(userId).lean();
  let project = null;

  if (user) {
    project = await Project.create({
      name: req.body.name,
      desc: req.body.description,
      status: "open",
      team: [{userId : user._id, name : user.name}]
    });
  }

  if (project) {
    return res.status(200).json({
      name: project.name,
      desc: project.desc,
      success: true
    });
  }
});

// @desc Get a project
// @route GET /api/projects/:id
// @access  Private
const getProject = asyncHandler(async (req, res) => {
  // get project info
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error("project does not exist");
  }
  res.status(200).json(project);
});

// @desc Update a project
// @route PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  // update project info
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!project) {
    throw new Error("Project doesn't exist");
  }
  res.status(200);
  res.json({ updatedproject: project });
});

// @desc Delete a project
// @route DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  // delete project 
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error(`project doesn't exist`);
  }
  await Project.deleteOne(project);
  res.status(200).json({ success: true, message: "Project removed" });
});

// @desc Get all projects
// @route GET /api/projects
// @access Private
const getProjects = asyncHandler(async (req, res) => {
  // getting projects for the user
  const userId = req.user._id
  const filter = { 'team':  
  {$elemMatch : 
    {'userId' : userId}
  } 
}
  const projects = await Project.find(filter).lean();
  const addCreator = async (item) => {
    const creatorId = item.team[0].userId
    const creatorName = await User.findById(creatorId).lean()
    item['creator'] = creatorName.name
  }
  for (const project of projects){
    await addCreator(project);
  }
  res.status(200).json(projects);
})

module.exports = { createProject, getProject, updateProject, deleteProject, getProjects };
