var express = require('express');
var router = express.Router();

var mysql      = require('mysql');

var db_config = {
  host     : 'us-cdbr-east-02.cleardb.com',
  user     : 'b0d7db5a46255f',
  password : 'e0ba2ce1',
  database : 'heroku_a9f9515c41ce864'
};



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

router.get('/', function(req, res, next) {
  res.render('../views/chanwoong/index', { title: 'Home' });
});
router.get('/login', function(req, res, next) {
  res.render('../views/chanwoong/login', { title: 'Login' });
});
router.get('/register', function(req, res, next) {
  res.render('../views/chanwoong/register', { title: 'register' });
});
router.get('/reservation', function(req, res, next) {
  res.render('../views/chanwoong/reservation', { title: 'Reservation' });
});
router.get('/room', function(req, res, next) {
  res.render('../views/chanwoong/room', { title: 'Room' });
});
router.get('/register',function(req,res, next){
  res.render('../views/chanwoong/register',{title:'Register'});
});

router.post('/register', function (req, res) {
  var korean_first = req.body.korean_first;
  var korean_last = req.body.korean_last;
  var english_first = req.body.english_first;
  var english_last = req.body.english_last;
  var phone_num = req.body.phone_num;
  var email = req.body.email;

  var password = req.body.password;

  var gender = req.body.gender;
  var birth = req.body.birth;
  var nation = req.body.nation;
  var add_city = req.body.add_city;
  var add_state = req.body.add_state;
  var zip = req.body.zip;
  var street = req.body.street;
  var apart_num = req.body.apart_num;
  var detail_address = req.body.detail_address;

  var address_id = null;

  connection.query('SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = "heroku_a9f9515c41ce864" AND TABLE_NAME = "address"', function(error, results) {
    if (error) {
      console.log(error);
    } 
    address_id = results.AUTO_INCREMENT;
    console.log("주목 : " + results);
  });
  
  var sql1 = 'INSERT INTO address(ZIP_CODE, ADDRESS1, ADDRESS2, ADDRESS3, ADDRESS4, ADDRESS5) VALUES(?, ?, ?, ?, ?,?)';
  connection.query(sql1, [zip, add_city, add_state, street, apart_num, detail_address], function (error, results, fields) {
    if (error) {
      console.log(error);
    } 
    console.log(results);
  });
  
  var person_id = null;
  connection.query('SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = "heroku_a9f9515c41ce864" AND TABLE_NAME = "person"', function(error, results) {
    if (error) {
      console.log(error);
    } 
    person_id = results.AUTO_INCREMENT;
  });

  var sql2 = 'INSERT INTO person(KOR_FIRST_NAME, KOR_LAST_NAME, ENG_FIRST_NAME, ENG_LAST_NAME, PHONE_NUM, EMAIL, ADDRESS_ID, GENDER, BIRTH, NATION) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql2, [korean_first, korean_last, english_first, english_last, phone_num, email, address_id, gender, birth, nation], function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    console.log(results);
  });


  


  var sql3 = 'INSERT INTO customer(PERSON_ID, LOGIN_ID, LOGIN_PW) VALUES(?, ?, ?)';
  connection.query(sql3, [person_id, email, password], function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    console.log(results);
  });
  
  console.log("가입성공");
  res.render('../views/chanwoong/index', {title: 'Home' });
});



module.exports = router;