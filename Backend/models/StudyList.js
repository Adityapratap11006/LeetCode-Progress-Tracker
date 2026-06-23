const mongoose = require("mongoose");

const studyListSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Study list name is required"],
            trim: true,
            maxlength: [100, "Name cannot exceed 100 characters"]
        },
        description: {
            type: String,
            default: "",
            maxlength: [500, "Description cannot exceed 500 characters"]
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        problems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Problem"
            }
        ]
    },
    {
        timestamps: true
    }
);

studyListSchema.index({ user: 1, name: 1 });

module.exports = mongoose.model("StudyList", studyListSchema);
