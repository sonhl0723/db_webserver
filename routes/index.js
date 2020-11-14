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



//vars for post method
var cust_info = null;//라우터가 처음 실행될 때 로그인 안된 상태를 표현


// chanwoong routing
router.get('/', function(req, res, next) {
  res.render('../views/chanwoong/index', { title: 'Home' , cust_info:cust_info});
});
router.get('/login', function(req, res, next) {
  res.render('../views/chanwoong/login', { title: 'Login' , cust_info:cust_info});
});
router.get('/reservation', function(req, res, next) {
  res.render('../views/chanwoong/reservation', { title: 'Reservation', cust_info:cust_info});
});
router.get('/room', function(req, res, next) {
  res.render('../views/chanwoong/room', { title: 'Room' , cust_info:cust_info});

});


router.post('/main',function (req,res) {
  var userid = req.body.userid;
  var userpwd = req.body.userpwd;
  connection.query('SELECT * FROM customer cross join person WHERE person.person_id=customer.person_id and login_id = ?', [userid], function (error, result, fields) {
    if (error) {
      console.log(error);
    }
    if (result.length == 0) {
      console.log("일치하는 아이디 없음");
      res.render('../views/chanwoong/login', {title: 'Login', cust_info: cust_info});
    } else {
      for (var i = 0; i < result.length; i++) {
        if (result[i].login_pw == userpwd) {
          console.log("로그인 성공");
          cust_info = result[i];
          res.render('../views/chanwoong/index', {title: 'Home', cust_info: cust_info});
          break;
        } else {
          console.log("로그인 실패...");
          res.render('../views/chanwoong/login', {title: 'Login', cust_info: cust_info});
        }
      }
    }
  })
})


  router.post('/search_room', function (req, res) {
    var room = req.body.room;
    var date_arrival = req.body.datedpar;
    var date_departure = req.body.datearr;
    var adult_num = req.body.adults;
    var child_num = req.body.children;
    var baby_num = req.body.babies;
    var people = adult_num + child_num + baby_num;
    var a="",b="",c="";
    var step =1;
    for(var i=0;i<date_arrival.length;i++){
      if(date_arrival[i] != '/'){
        if(step == 1) a += date_arrival[i];
        else if(step ==2) b+= date_arrival[i];
        else if(step ==3) c+= date_arrival[i];
      }
      else{
        step++;
      }
    }var date_arr=c+"-"+a+"-"+b+" 00:00:00";
    a="";b="";c="";step =1;
    for(var i=0;i<date_departure.length;i++){
      if(date_departure[i] != '/'){
        if(step == 1) a += date_departure[i];
        else if(step ==2) b+= date_departure[i];
        else if(step ==3) c+= date_departure[i];
      }
      else{
        step++;
      }
    }var date_dpa=c+"-"+a+"-"+b+" 00:00:00";



    var avail_type = null;//인원수에 따른 가능한 방 타입들

    var sql = 'select * from room_type';
    connection.query(sql, function (error, result, fields) {
      if (error) {
        console.log(error);
      }
      for (var i = 0; i <= result.lenght; i++) {
        if (result[i].capacity_max >= people) {
          avail_type += result[i];
        }
      }
      res.render('../views/chanwoong/reservation', {title: 'Reservation', cust_info: cust_info});
    })
    if (room != 0) {//방을 선택한 경우
      //예약 가능한 방의 개수를 알기 위해 예약이 잡혀있는 방의 개수를 구한다
      var sql1 = 'SELECT count(reservation_id) as re,room_type FROM reservation WHERE ((CHECKIN_DATE BETWEEN ? AND ?) OR (CHECKOUT_DATE BETWEEN ? AND ?)) AND ROOM_TYPE = ? ';
    } else {//방을 선택하지 않은 경우 선택된 인원에 따라 모든 방의 종류를 보여줌
      var test = 'SELECT count(reservation_id) as re FROM reservation where (CHECKIN_DATE BETWEEN '+connection.escape(date_dpa)+' AND '+connection.escape(date_arr)+') OR (CHECKOUT_DATE BETWEEN '+connection.escape(date_dpa)+' AND '+connection.escape(date_arr)+') group by room_type';
      var sql1 = 'SELECT count(reservation_id) as re FROM reservation where (CHECKIN_DATE BETWEEN ? AND ?) OR (CHECKOUT_DATE BETWEEN ? AND ?) group by room_type';
      connection.query(test, function (error, result, fields) {
        if (error) {
          console.log(error);
        }
        console.log("=======================================================================");
        console.log(result[0].re);
        console.log(result);
        res.render('../views/chanwoong/reservation', {title: 'Reservation', cust_info: cust_info});
      })
    }
  })




module.exports = router;



//INSERT INTO reservation VALUES (272, 271, 'EXECUTIVE_SUITE' ,null,'2000-1-1 00:00:00','2000-1-4 00:00:00',271,1,1,1,1);
// SELECT count(reservation_id) as re FROM reservation where (CHECKIN_DATE BETWEEN '1996-4-1 00:00:00' AND '2020-12-5 00:00:00') OR (CHECKOUT_DATE BETWEEN '1996-4-1 00:00:00' AND '2020-12-5 00:00:00') group by room_type;