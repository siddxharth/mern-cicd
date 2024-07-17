const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String,
        required: [true, "Question title is required."],
        unique: true,
    },
});

module.exports = mongoose.model("Question", questionSchema);
