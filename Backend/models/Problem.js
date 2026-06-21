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

    status: {
        type: String,
        enum: ["Solved", "Attempted", "Need Review"],
        default: "Attempted"
    },

    leetcodeLink: {
        type: String,
        required: true
    },

    tags: {
        type: [String],
        default: []
    },

    notes: {
        type: String,
        default: ""
    },

    timeSpentMinutes: {
        type: Number,
        default: 0
    },

    language: {
        type: String,
        default: ""
    },

    attemptCount: {
        type: Number,
        default: 1
    },

    revisionCount: {
        type: Number,
        default: 0
    },

    solvedAt: {
        type: Date,
        default: Date.now
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