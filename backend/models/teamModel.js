const mongoose = require("mongoose");

const teamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    members: {
      type: Array,
      required: true,
    },
    lead: { type: mongoose.Schema.Types.ObjectId, required: true, ref : "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Team", teamSchema);
