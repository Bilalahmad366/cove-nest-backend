const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, },
        email: { type: String, required: true, unique:true },
        mobile_no: { type: String, required: true},
        message: { type: String },
    },
    { timestamps: true, }
);

module.exports = mongoose.model("Expert", expertSchema);
