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
    issues: {
      type: Array,
    },
    status: {
      type: String,
      required : true
    },
    team : [{
      type : {
        userId : {type : mongoose.SchemaTypes.ObjectId, ref : 'User', required : true},
        name : {type : String, required : true}
      },
      required : true
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);