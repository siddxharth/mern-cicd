const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
    },
});

module.exports = mongoose.model("Friend", friendSchema);
