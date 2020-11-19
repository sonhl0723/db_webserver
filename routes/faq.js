var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('../views/chanwoong/faq', { title: 'Faq', cust_info:null});
});

module.exports = router;