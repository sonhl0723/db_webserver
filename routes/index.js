var express = require('express');
var router = express.Router();

// chanwoong routing
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.render('../views/chanwoong/index', { title: 'Home' , cust_info:cust_info});
});
router.get('/login', function(req, res, next) {
  res.render('../views/chanwoong/login', { title: 'Login' , cust_info:cust_info});
});
router.get('/reservation', function(req, res, next) {
  res.render('../views/chanwoong/reservation', { title: 'Reservation', cust_info:cust_info,avail_roomtype:available_roomtypes});
});
router.get('/room', function(req, res, next) {
  res.render('../views/chanwoong/room', { title: 'Room' , cust_info:cust_info});
});
router.get('/register',function(req,res, next){
  res.render('../views/chanwoong/register',{title:'Register', cust_info:cust_info});
});
router.get('/review', function(req,res, next) {
  res.render('../views/chanwoong/review', { title: 'Review' , cust_info:cust_info});
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

  var sql1 = 'INSERT INTO address(ZIP_CODE, ADDRESS1, ADDRESS2, ADDRESS3, ADDRESS4, ADDRESS5) VALUES(?, ?, ?, ?, ?,?)';
  connection.query(sql1, [zip, add_city, add_state, street, apart_num, detail_address], function (error, rows, fields) {
    if (error) {
      console.log(error);
    } 
    var sql2 = 'INSERT INTO person(KOR_FIRST_NAME, KOR_LAST_NAME, ENG_FIRST_NAME, ENG_LAST_NAME, PHONE_NUM, EMAIL, ADDRESS_ID, GENDER, BIRTH, NATION) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql2, [korean_first, korean_last, english_first, english_last, phone_num, email, rows.insertId, gender, birth, nation], function (error, results, fields) {
      if (error) {
        console.log(error);
      }
      var sql3 = 'INSERT INTO customer(PERSON_ID, LOGIN_ID, LOGIN_PW) VALUES(?, ?, ?)';
      connection.query(sql3, [results.insertId, email, password], function (error, results, fields) {
        if (error) {
          console.log(error);
        }
        console.log(results);
      });
      console.log(results);
=======
    res.render('chanwoong/index', { 
      title: 'Home' , 
      cust_info:null
>>>>>>> upstream/develop
    });
});

router.get('/room', function(req, res, next) {
  res.render('../views/chanwoong/room', { title: 'Room' , cust_info:null});
});


module.exports = router;