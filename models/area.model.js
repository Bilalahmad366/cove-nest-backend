const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  heading: { type: String, trim: true },
  paragraph: { type: String, trim: true },
  image: {
    url: { type: String },
    public_id: { type: String },
  },
});

const areaSchema = new mongoose.Schema(
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
    is_featured: {  type: Boolean,  },
    image: {
      url: { type: String },
      public_id: { type: String },
    },
    mapIframe: {
      type: String,
      trim: true,
    },
    sections: [sectionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Area", areaSchema);
