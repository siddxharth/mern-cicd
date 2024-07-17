const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
        },
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Creator is required."],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    title: {
        type: String,
        required: [true, "Title is required."],
    },
    description: {
        type: String,
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Friend",
        },
    ],
});

module.exports = mongoose.model("Quiz", quizSchema);
