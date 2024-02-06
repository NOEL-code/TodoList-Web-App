var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("My first111 express")
  // res.render('index', { title: 'Hello' });
});

module.exports = router;
