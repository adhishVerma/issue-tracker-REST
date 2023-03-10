const mongoose = require("mongoose");

const issueSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    project: { type: String, required: true },
    status: { type: String, required: true },
    team: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Issue", issueSchema);
