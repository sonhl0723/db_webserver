var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
<<<<<<< HEAD
    res.render('../views/chanwoong/help', { title: 'Help' , cust_info:null});
});


=======
  res.render('../views/chanwoong/help', { title: 'Help' , cust_info:null});
});

>>>>>>> 602193d5d80e5c84c2874364299e4007ac3e7a96
module.exports = router;