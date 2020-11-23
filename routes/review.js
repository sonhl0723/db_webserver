var express = require('express');
var router = express.Router();
var connection = require('./db');

router.get('/', function(req, res, next) {
    var sql1 = `SELECT STAR_POINT, CONTENT, DATE, TITLE, ROOM_TYPE, LOGIN_ID FROM REVIEW NATURAL JOIN RESERVATION NATURAL JOIN CUSTOMER ORDER BY DATE DESC;`;
    connection.query(sql1, function (error, result, fields) {
        if (error) {
            console.log(error);
        }
        res.render('../views/chanwoong/review', {title: 'Review', cust_info: null, reviewData: result})
    });
});


// router.post('/', function(req, res, next) {
//     var rating = req.body.rating;
//     var content = req.body.content;$
//     var content_title = req.body.content_title;
//     console.log(rating);
//     console.log(content);
//     console.log(content_title);
//
//     var sql = 'INSERT INTO review (RESERVATION_ID, STAR_POINT, CONTENT, DATE, TITLE) VALUES(?, ?, ?, ?, ?)';
//     connection.query(sql, ['1', '1', content, content_title], function (error, results) {
//         if (error) {
//             console.log(error);
//         }
//         console.log(results);
//         res.redirect('/review');
//     });
// });

module.exports = router;