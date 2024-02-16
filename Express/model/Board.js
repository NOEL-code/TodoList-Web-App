const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: null},
})

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;

