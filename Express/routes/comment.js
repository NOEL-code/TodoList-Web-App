const express = require('express');
const router = express.Router();

const Comment = require('../model/Comment');
const Board = require('../model/Board');

router.get('/:id/comment', (req, res, next) => {
    const id = req.params.id;
    Board.findById(id)
        .then( (board) =>{
            Comment.find({boardId:board._id})
            .then((comment) => {
                res.json(comment);
            })     
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:id/comment/:cId', function(req, res, next) {

    const cId = req.params.cId;
    Comment.findById(cId)
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/:id/comment', function(req, res, next) {
    const id = req.params.id;
    Board.findById(id)
        .then((board) => {
            if (!board) {
                res.status(404).json({ message: 'Board not found' });
                return;
            }
            const newComment = new Comment(req.body);
            newComment.save()
                .then((comment) => {
                    res.json(comment);
                })
        })
        .catch((err) => {
            next(err);
        });
});

router.put('/:id/comment/:cId', function(req, res, next) {
    const cId = req.params.cId;
    const {author, comment} = req.body;

    Comment.findByIdAndUpdate(cId, {
            comment,
            author
        }, { new: true })
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete('/:id/comment/:cId', function(req, res, next) {
    const cId = req.params.cId;
    
    Comment.findByIdAndDelete(cId)
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
