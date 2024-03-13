const express = require("express");
const router = express.Router();
const { createToken, verifyToken } = require("../utils/auth");
const { verify } = require("jsonwebtoken");

const Comment = require("../model/Comment");
const Board = require("../model/Board");
const User = require("../model/User");

router.get("/comment/:boardId", (req, res, next) => {
  const id = req.params.boardId;

  Board.findById(id)
    .then((board) => {
      Comment.find({ boardId: board._id })
        .populate("author")
        .then((comment) => {
          res.json(comment);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/comment/:commentId", function (req, res, next) {
  const cId = req.params.cId;
  Comment.findById(cId)
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/comment/:boardId", authenticate, function (req, res, next) {
  const id = req.params.boardId;
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      Board.findById(id)
        .then((board) => {
          if (!board) {
            res.status(404).json({ message: "Board not found" });
            return;
          }

          const newComment = new Comment({
            boardId: id,
            content: req.body.content,
            author: userId,
          });
          return newComment.save();
        })
        .then((comment) => {
          res.json(comment);
        });
    })
    .catch(() => {
      const error = new Error("Authorization Failed");
      error.status = 403;
      next(error);
    });
});

router.put("/comment/:commentId", authenticate, function (req, res, next) {
  const cId = req.params.cId;
  const userId = req.user._id;

  Comment.findById(cId)
    .then((comment) => {
      if (!comment) {
        res.status(404).json({ message: "comment not found" });
        return;
      }

      if (comment.author.toString() !== userId) {
        const error = new Error("Unauthorized to update this board");
        error.status = 403;
        throw error;
      }

      comment.content = req.body.content;
      comment.updateAt = Date.now();

      return comment.save();
    })
    .then((updatedComment) => {
      res.json(updatedComment);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/comment/:commentId", authenticate, function (req, res, next) {
  const cId = req.params.cId;
  const userId = req.user._id;

  Comment.findByIdAndDelete(cId)
    .then((comment) => {
      if (!comment) {
        res.status(404).json({ message: "comment not found" });
        return;
      }

      if (comment.author.toString() !== userId) {
        const error = new Error("Unauthorized to update this ");
        error.status = 403;
        throw error;
      }

      res.json(comment);
    })
    .catch((err) => {
      next(err);
    });
});

async function authenticate(req, res, next) {
  let token = req.cookies.authToken;
  let headerToken = req.headers.authentication;
  if (!token && headerToken) {
    token = headerToken.split(" ")[1];
  }
  const user = verifyToken(token);
  req.user = user;

  if (!user) {
    const error = new Error("Authorization Failed");
    error.status = 403;

    next(error);
  }
  next();
}

module.exports = router;
