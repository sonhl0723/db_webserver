var express = require('express');
var router = express.Router();

// chanwoong routing
router.get('/', function(req, res, next) {
    res.render('chanwoong/index', { 
      title: 'Home' , 
      cust_info:null
    });
});

router.get('/complain', function(req, res, next) {
  res.render('../views/chanwoong/complain', { title: 'Complain' , cust_info:null});
});


module.exports = router;