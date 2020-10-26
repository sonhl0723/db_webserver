var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../views/luxe/index', { title: 'Home' });
});
router.get('/login', function(req, res, next) {
  res.render('../views/luxe/login', { title: 'Login' });
});
router.get('/services', function(req, res, next) {
  res.render('../views/luxe/services', { title: 'Services' });
});
router.get('/blog', function(req, res, next) {
  res.render('../views/luxe/blog', { title: 'Blog' });
});
router.get('/contract', function(req, res, next) {
  res.render('../views/luxe/contract', { title: 'Contract' });
});
router.get('/hotel', function(req, res, next) {
  res.render('../views/luxe/hotel', { title: 'Hotel' });
});

module.exports = router;
