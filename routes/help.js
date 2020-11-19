var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('../views/chanwoong/help', { title: 'Help' , cust_info:null});
});


module.exports = router;