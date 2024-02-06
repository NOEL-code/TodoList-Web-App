const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    content: {type: String, required: true},
    color: {type: String, default: "white"},
    isUpdate: {type: Boolean, default: false},
    choText: {type: String, default: "?"}
})

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;

