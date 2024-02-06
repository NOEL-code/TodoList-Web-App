const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
    },
    author: String,    
    comment: {type: String, required: true},
})

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;

