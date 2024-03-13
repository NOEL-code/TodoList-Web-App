var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
const mongoose = require("mongoose");
const session = require("express-session");
var app = express();

const watchaRouter = require("./routes/watcha");
const boardRouter = require("./routes/board");
const todoRouter = require("./routes/todo");
const commentRouter = require("./routes/comment");
const userRouter = require("./routes/users");

const MONGO_HOST =
  "mongodb+srv://admin:admin@cluster0.zbtixhn.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_HOST, {
    retryWrites: true,
    w: "majority",
  })
  .then((resp) => {
    console.log("DB 연결 성공oo");
  });

app.use(
  cors({
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
    ],
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "<my-secret>",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

// app.use(function(req, res, next) {
//   if(!req.session.path){
//     req.session.path = [];
//   }else{
//     req.session.path.push(req.path);
//   }
//   console.log(req.session.path)
//   next()
// });

app.use("/", indexRouter);
app.use("/watcha", watchaRouter);
app.use("/api", boardRouter);
app.use("/todo", todoRouter);
app.use("/api/", commentRouter);
app.use("/api/", userRouter);

app.use(function (req, res, next) {
  console.log(req);
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error(err);

  res.json({ err: err });
  // res.render('error');
});

module.exports = app;
