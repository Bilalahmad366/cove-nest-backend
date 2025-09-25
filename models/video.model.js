const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    videos: [
      {
        title: {
          type: String,
          required: true,
        },
        youtubeUrl: {
          type: String,
          required: true,
        },
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
