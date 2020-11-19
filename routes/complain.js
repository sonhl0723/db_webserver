var express = require('express');
var router = express.Router();
var connection = require('./db');




//페이지를 열 때 이미 있는 컴플레인 정보를 넘겨줌
router.post('/',function (req,res) {
    var sql = "SELECT * FROM COMPLAIN";
    var sql2 = "SELECT * FROM PERSON NATURAL JOIN EMPLOYEE WHERE EP_STATE = TRUE";
    connection.query(sql, function (error, result, fields) {
        if (error) {
            console.log(error);
        }
        console.log(result);
        res.render('../views/chanwoong/complain',{complain: result});
    });
});


//컴플레인을 추가할 때 호출
router.post('/ADD',function (req,res) {
    var roomnum=req.body.ROOM_NUM;var description=req.body.content;var employee_id=null;var type=req.body.complain_type;var start_time;var fin_time=null;var priority=req.body.priority;

    var sql = "INSERT INTO ADDRESS(ROOM_NUM,DESCRIPTION,EMPLOYEE_ID,TYPE,START_TIME,FIN_TIME,PRIORITY) VALUES(?, ?, ?, ?, ?,?,?)";
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