var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
const mongoose = require("mongoose");

var app = express();

const MONGO_HOST = 'mongodb+srv://admin:admin@cluster0.jtdvjdz.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_HOST,{
    retryWrites: true,
    w: "majority"
}).then(resp=> {
    console.log("DB 연결 성공oo");
});
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(cors({origin: [
  'http://127.0.0.1:3000',
  'http://localhost:3000'
]}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use('/', indexRouter);

const watchaRouter = require('./routes/watcha');
app.use('/watcha', watchaRouter);

const boardRouter = require('./routes/board');
app.use('/board', boardRouter);

const todoRouter = require('./routes/todo');
app.use('/todo', todoRouter);

const commentRouter = require('./routes/comment');
app.use('/board/', commentRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error(err);

  res.json({err:err})
  // res.render('error');
});

module.exports = app;
