const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: null},
    content: {type: String, required: true},
})

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;

