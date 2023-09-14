const mongoose = require("mongoose");

const issueSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    projectId: { type: String, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    assignee : {type : String, required : false},
    type : {type : String, require : true}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Issue", issueSchema);
