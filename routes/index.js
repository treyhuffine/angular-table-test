var express = require('express');
var router = express.Router();
var fs = require('fs');
var data = require('../data.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/data', function(req, res, next) {
  res.json(data.features);
});

module.exports = router;
