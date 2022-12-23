const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    open_issues: {
      type: Array,
    },
    closed_issues: {
      type: Array,
    },
    status: {
      type: String,
      required : true
    },
    teamId : {
      type : mongoose.Schema.Types.ObjectId,
      required : true,
      ref : "Team"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);