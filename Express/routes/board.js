const express = require('express');
const router = express.Router();

const Board = require("../model/Board");

router.get('/', (req, res, next) => {
    Board.find()
        .then((board) => {
            res.json(board);
        })
        .catch((err) => {
            next(err);
        });
});

router.get("/:id", function(req, res, next) {
    Board.findById(req.params.id)
        .then(board => {
            res.json(board);
        })
        .catch((err) => {
            next(err);
        });
});

router.post("/", function(req, res, next) {
    console.log(req.body);
    Board.create(req.body)
        .then((insert) => {
            res.json(insert);
        })
        .catch((err) => {
            next(err);
        });
});

router.put("/:id", function(req, res, next) {
    const id = req.params.id;
    const { title, content, author } = req.body;
    console.log(req.body);

    Board.findByIdAndUpdate(id, {
            title,
            content,
            author
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete("/:id", function(req, res, next) {
    console.log(req.body);
    Board.findByIdAndDelete(req.params.id)
        .then((deletedBoard) => {
            res.json(deletedBoard);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
