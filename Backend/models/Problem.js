const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true
        },

        topic: {
            type: String,
            required: true
        },

        status: {
            type: String,
            default: "Solved"
        },

        leetcodeLink: {
            type: String,
            required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model(
    "Problem",
    problemSchema
);