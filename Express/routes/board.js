const express = require('express');
const router = express.Router(); 
const { createToken, verifyToken } = require('../utils/auth');
const { verify } = require('jsonwebtoken');
const User = require('../model/User');
const Board = require("../model/Board");

router.get('/board', (req, res, next) => {
    Board.find()
        .then((board) => {
            res.json(board);
        })
        .catch((err) => {
            next(err);
        });
});

router.get("/board/:id", function(req, res, next) {

    Board.findById(req.params.id)
        .then(board => {
           
            res.json(board);
        })
        .catch((err) => {
            next(err);
        });
});

router.post("/board", authenticate, async function(req, res, next) {
    const userId = req.user._id;
    
    User.findById(userId)
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const newBoard = new Board({
                title: req.body.title,
                content: req.body.content,
                author: userId,
            });

            newBoard.save()
                .then((board) => {
                    res.json(board);
                })
                .catch((err) => {
                    next(err);
                });
        })
        .catch(() => {
            const error = new Error("Authorization Failed");
            error.status = 403;
            next(error);
        });
});


router.put("/board/:id", authenticate, function(req, res, next) {
    const boardId = req.params.id;
    const userId = req.user._id;

    Board.findById(boardId)
        .then((board) => {
            if (!board) {
                res.status(404).json({ message: 'Board not found' });
                return;
            }

            if (board.author.toString() !== userId) {
                const error = new Error("Unauthorized to update this board");
                error.status = 403;
                throw error;
            }

            board.title = req.body.title;
            board.content = req.body.content;
            board.updateAt = Date.now();

            return board.save();
        })
        .then((updatedBoard) => {
            res.json(updatedBoard);
        })
        .catch((err) => {
            next(err);
        });
});


router.delete("/board/:id", authenticate, function(req, res, next) {
    const boardId = req.params.id;
    const userId = req.user._id;

    Board.findById(boardId)
        .then((board) => {
            if (!board) {
                res.status(404).json({ message: 'Board not found' });
                return;
            }

            if (board.author.toString() !== userId) {
                const error = new Error("Unauthorized to delete this board");
                error.status = 403;
                throw error;
            }

            return Board.findByIdAndDelete(boardId);
        })
        .then((deletedBoard) => {
            res.json(deletedBoard);
        })
        .catch((err) => {
            next(err);
        });
});


async function authenticate(req, res, next){
    let token = req.cookies.authToken;
    let headerToken = req.headers.authentication;
    if(!token && headerToken){
        token = headerToken.split(" ")[1];
    } 
    const user = verifyToken(token);
    req.user = user;

    if(!user){
        const error = new Error("Authorization Failed");
        error.status = 403;

        next(error);
    }
    next();
}

module.exports = router;
