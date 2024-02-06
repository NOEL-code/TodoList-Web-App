const express = require('express');
const router = express.Router();

const Watcha = require("../model/Watcha");

router.get('/', (req, res, next) => {
    Watcha.find()
        .then((board) => {
            res.json(board);
        })
        .catch((err) => {
            next(err);
        });
});

router.post("/", function(req, res, next) {
    console.log(req.body);
    Watcha.create(req.body)
        .then((insert) => {
            res.json(insert);
        })
        .catch((err) => {
            next(err);
        });
});

router.put("/:id", function(req, res, next) {
    const id = req.params.id;
    Watcha.findByIdAndUpdate(id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete("/:id", function(req, res, next) {
    console.log(req.body);
    console.log(req.params.id);
    Watcha.findByIdAndDelete(req.params.id)
        .then((deletedBoard) => {
            console.log(deletedBoard);
            res.json(deletedBoard);
           
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
