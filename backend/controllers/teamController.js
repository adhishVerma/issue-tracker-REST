const asyncHandler = require("express-async-handler");
const Team = require("../models/teamModel");

// @desc Create a team
// @route POST /api/teams
// @access  Private
const createTeam = asyncHandler(async (req, res) => {
  try {
    const team = await Team.create({
      name: req.body.name,
      desc: req.body.desc,
      members: [],
      lead: req.user,
    });
    res.status(200).json(team);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc edit a team
// @route PUT /api/teams/:id
// @access  Private
const editTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (team.lead.toString() === req.user.id && req.body.operation === "add") {
    // add member
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      {
        members: [...team.members, req.body.member],
      },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedTeam);
  } else if (
    team.lead.toString() === req.user.id &&
    req.body.operation === "remove"
  ) {
    // remove member
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      {
        members: team.members.filter((member) => member != req.body.member),
      },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedTeam);
  }
});

// @desc get a team
// @route GET /api/teams/:id
// @access  Private
const getTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    res.status(400);
    throw new Error(`No such team exists`);
  }
  res.status(200).json(team);
});

// @desc Create a team
// @route DELETE /api/teams/:id
// @access  Private
const removeTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    res.status(400);
    throw new Error(`No such team exists`);
  }
  if (team.lead.toString() === req.user.id) {
    await Team.deleteOne(team);
    return res.status(200).json(team);
  }
});

module.exports = { createTeam, editTeam, getTeam, removeTeam };
