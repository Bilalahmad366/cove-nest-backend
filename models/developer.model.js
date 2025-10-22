const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      url: { type: String },
      public_id: { type: String },
    },
    is_featured: { type: Boolean, },
    mapIframe: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Developer", developerSchema);
