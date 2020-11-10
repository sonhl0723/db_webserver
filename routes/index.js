var express = require('express');
var router = express.Router();

var mysql      = require('mysql');

var db_config = {
  host     : 'us-cdbr-east-02.cleardb.com',
  user     : 'b0d7db5a46255f',
  password : 'e0ba2ce1',
  database : 'heroku_a9f9515c41ce864'
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

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
router.get('/booking', function(req, res, next) {
  res.render('../views/luxe/booking', { title: 'Booking' });
});


module.exports = router;