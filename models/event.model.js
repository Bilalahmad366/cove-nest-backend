const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, },
        description: { type: String, required: true, },
        date: { type: String, required: true },
        location: { type: String, required: true },
        image: { type: String, required: false, },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true, }
);

module.exports = mongoose.model("Event", eventSchema);
