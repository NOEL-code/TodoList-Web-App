const express = require('express');
const router = express.Router();

const Todo = require("../model/Todo");

router.get('/', (req, res, next) => {
    Todo.find()
        .then((todo) => {
            res.json(todo);
        })
        .catch((err) => {
            next(err);
        });
});

router.get("/:id", function(req, res, next) {
    Todo.findById(req.params.id)
        .then(todo => {
            res.json(todo);
        })
        .catch((err) => {
            next(err);
        });
});

router.post("/", function(req, res, next) {
    console.log(req.body);
    Todo.create(req.body)
        .then((todo) => {
            res.json(todo);
        })
        .catch((err) => {
            next(err);
        });
});

router.put("/:id", function(req, res, next) {
    const id = req.params.id;
    const {content} = req.body;
    console.log(req.body);

    Todo.findByIdAndUpdate(id, {
            content,
        })
        .then((todo) => {
            res.json(todo);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete("/:id", function(req, res, next) {
    console.log(req.body);
    Todo.findByIdAndDelete(req.params.id)
        .then((deletedBoard) => {
            res.json(deletedBoard);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
