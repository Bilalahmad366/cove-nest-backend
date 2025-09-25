// models/Blog.js
const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now },

  tableOfContents: [
    {
      title: String, 
    },
  ],

  sections: [
    {
      title: String,
      projectRef: {
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }, 
      },
      connectivity: [String],
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Blog", BlogSchema);
