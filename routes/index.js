var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'us-cdbr-east-02.cleardb.com',
  user     : 'b533707a3ce3ab',
  password : '204d04b4',
  database : 'heroku_f30c74be296965b'
});

//DB에 정상 연결 되었는지 확인하는 부분.
connection.connect(function(err){
  if(err){
    console.log("error connecting : " + err.stack);
    return;
  }
  console.log('Success to DB connect!');
})


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
