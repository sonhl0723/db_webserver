var express = require('express');
var router = express.Router();
var connection = require('./db');


var sql = "SELECT * FROM COMPLAIN";
// function으로 만들던지 해서 get method 호출 시마다 resultx의 갱신이 필요
var resultx;
connection.query(sql, function (error, result, fields) {
    if (error) {
        console.log(error);
    }
    resultx =result;
});


router.get('/', function(req, res, next) {
    // var sql = "SELECT * FROM COMPLAIN";
    // connection.query(sql, function (error, result, fields) {
    //     if (error) {
    //         console.log(error);
    //     }
    //     var fucking = JSON.parse(JSON.stringify(result));
    //     res.render('../views/chanwoong/complain', { title: 'Complain' , cust_info:null,complain:fucking});
    // });
    res.render('../views/chanwoong/complain', { title: 'Complain' , cust_info:null,complain:resultx});

});


//컴플레인을 추가할 때 호출
router.post('/ADD',function (req,res) {
    var roomnum=req.body.ROOM_NUM;var description=req.body.content;var employee_id=null;var type=req.body.complain_type;var start_time;var fin_time=null;var priority=req.body.priority;

    var sql = "INSERT INTO COMPLAIN(ROOM_NUM,DESCRIPTION,EMPLOYEE_ID,TYPE,START_TIME,FIN_TIME,PRIORITY) VALUES(?, ?, ?, ?, ?,?,?)";
    connection.query(sql,[roomnum,description,employee_id,type,start_time,fin_time,priority], function (error, result, fields) {
        if (error) {
            console.log(error);
        }
    });
});

// `COMPLAIN_ID`           INT         NOT NULL    AUTO_INCREMENT COMMENT '민원ID',
//     `ROOM_NUM`     INT         NOT NULL    COMMENT '객실번호',
//     `DESCRIPTION`  TEXT        NOT NULL    COMMENT '내용',
//     `EMPLOYEE_ID`     INT         NULL        COMMENT '직원ID',
//     `TYPE`         ENUM('AMENITY','COMPLAIN','PRIMARY')        NOT NULL    COMMENT '민원타입',
//     `START_TIME`   DATETIME    NOT NULL    COMMENT '민원발생시간',
//     `FIN_TIME`     DATETIME    NULL        COMMENT '민원종료시간',
//     `PRIORITY`     INT        NOT NULL     COMMENT '우선순위',



module.exports = router;