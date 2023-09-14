const asyncHandler = require("express-async-handler");
const Project = require('../models/projectModel');
const User = require('../models/userModel');

// @desc edit a team
// @route PUT /api/teams/:id
// @access  Private
const editTeam = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  const team = project.team
  const teamLead = team[0]
  if (teamLead.userId.toString() === req.user.id && req.body.operation === "add") {
    // find member
    const user = await User.findById(req.body.userId);
    // push user name and id in the team.
    if(user){
      // check to see if user already exists in the array
      const teamCopy = [...project.team]
      if(teamCopy.some((element) => element.userId.toString() === req.body.userId)) return res.status(200).json({success : false})
      teamCopy.push({ userId: user._id, name: user.name });
      project.team = teamCopy
      await project.save();
    }
    return res.status(200).json({ success: true });
  } else if (
    teamLead.userId.toString() === req.user.id &&
    req.body.operation === "remove"
  ) {
    // remove member
    if (teamLead.userId.toString() === req.body.userId) return res.status(200).json({ success: false });

    let teamCopy = [...project.team];
    teamCopy = teamCopy.filter((item) => item.userId != req.body.userId);
    project.team = teamCopy;
    await project.save();
    return res.status(200).json({ success: true });
  } else {
    return res.status(200).json({ success: false });
  }
});




module.exports = { editTeam };
