const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    project_name: { type: String, required: true },
    developer_name: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: String, required: true },
    plan_status: { type: String, required: true },
    property_type: { type: String, required: true },
    size: { type: String, required: true },
    min_price: { type: Number, required: true },
    max_price: { type: Number, required: true },
    handover: {
      from: { type: Date },
      to: { type: Date },
    },
     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
