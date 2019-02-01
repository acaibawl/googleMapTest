var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/Volumes/LaCie/GitHub/初めてのNodejs/googleMapTest/public/html/map.html');
});

module.exports = router;
