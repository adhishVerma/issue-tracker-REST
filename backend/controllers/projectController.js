const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");

// @desc Create a project
// @route POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  // create project
  const project = await Project.create({
    name: req.body.name,
    desc: req.body.desc,
    status: "open",
    teamId: req.body.team,
  });
  if (project) {
    return res.status(200).json({
      name: project.name,
      desc: project.desc,
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
  // delete project in case of wrong entry
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error(`project doesn't exist`);
  }
  await Project.deleteOne(project);
  res.status(200).json({ success: true, message: "Project removed" });
});

module.exports = { createProject, getProject, updateProject, deleteProject };
