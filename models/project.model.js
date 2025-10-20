const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    project_name: { type: String, required: true },
    developer_name: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: String, required: true },
    plan_status: { type: String, required: true },
    property_type: { type: String, required: true },

    about_overview: { type: String }, 
    about_points: [{ type: String }],
    // 🏦 Payment Plans
    payment_plans: {
      on_downpayment: { type: String },
      on_construction: { type: String },
      on_handover: { type: String },
      description: { type: String },
    },
    area: { type: String, required: true },
    min_price: { type: String, required: true },
    max_price: { type: String },
    handover: { type: String, required: true },
    amenities: [{ type: String, }],
    description: { type: String },
    size: { type: String, required: true },
    images: [
      {
        type: String,
      },
    ],
    category: { type: String },
    isBestArea: {
      type: Boolean,
      default: false,
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
