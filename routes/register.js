var express = require('express');
var router = express.Router();
var connection = require('./db');

router.get('/',function(req,res, next){
    res.render('../views/chanwoong/register',{title:'Register', cust_info:null});
});


router.post('/', function (req, res) {
    var korean_first = req.body.korean_first;
    var korean_last = req.body.korean_last;
    var english_first = req.body.english_first;
    var english_last = req.body.english_last;
    var phone_num = req.body.phone_num;
    var email = req.body.email;
  
    var password = req.body.password;
    var forget_password = req.body.forget_password;
  
    var gender = req.body.gender;
    var birth = req.body.birth;
    var nation = req.body.nation;
    var add_city = req.body.add_city;
    var add_state = req.body.add_state;
    var zip = req.body.zip;
    var street = req.body.street;
    var apart_num = req.body.apart_num;
    var detail_address = req.body.detail_address;
  
    var sql1 = 'INSERT INTO ADDRESS(ZIP_CODE, ADDRESS1, ADDRESS2, ADDRESS3, ADDRESS4, ADDRESS5) VALUES(?, ?, ?, ?, ?,?)';
    connection.query(sql1, [zip, add_city, add_state, street, apart_num, detail_address], function (error, rows, fields) {
      if (error) {
        console.log(error);
      } 
      var sql2 = 'INSERT INTO PERSON(KOR_FIRST_NAME, KOR_LAST_NAME, ENG_FIRST_NAME, ENG_LAST_NAME, PHONE_NUM, EMAIL, ADDRESS_ID, GENDER, BIRTH, NATION) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(sql2, [korean_first, korean_last, english_first, english_last, phone_num, email, rows.insertId, gender, birth, nation], function (error, results, fields) {
        if (error) {
          console.log(error);
        }
        var sql3 = 'INSERT INTO CUSTOMER(PERSON_ID, PW_ANSWER, LOGIN_ID, LOGIN_PW) VALUES(?, ?, ?, ?)';
        connection.query(sql3, [results.insertId, forget_password, email, password], function (error, results, fields) {
          if (error) {
            console.log(error);
          }
          console.log(results);
        });
        console.log(results);
      });
      console.log(rows);
    });
    console.log("가입성공");
    res.redirect('/');
  });
  

module.exports = router;