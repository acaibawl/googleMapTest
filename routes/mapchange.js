var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/Volumes/LaCie/GitHub/初めてのNodejs/googleMapTest/public/html/mapchange.html');
});
router.post('/',(req, res) => {
  console.log('mapchangeのpostアクション開始')
     var map_comf = require('../public/javascripts/map_conf.json');
     var areaId = req.body.areaId;
     console.log(areaId);
     var resJson = {};
     for(let json of map_comf){
       console.log(json.key);
       if(json.key == areaId){
         resJson.center_lat = json.center_lat;
         resJson.center_lng = json.center_lng;
         resJson.zoom = json.zoom;
         resJson.data = json.markerData;
     }
    }
     console.log(resJson);
     res.send(resJson);
})
 
module.exports = router;
