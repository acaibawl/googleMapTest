var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET METHOD*/
router.get('/', function(req, res, next) {
  // 相対パスを、path.resolveで絶対パスに変換
  fs.readFile(path.resolve(__dirname, '../public/html/mapchange.html'), {encoding: 'utf8'}, (err, data) => {
    if(err){
      res.send('htmlファイルが読み込めませんでした:' + err.path);
    }
    res.send(data);
  })
});

/* POST METHOD*/
router.post('/',(req, res) => {
  // console.log('mapchangeのpostアクション開始')
     var map_comf = require('../public/javascripts/map_conf.json');
     var areaId = req.body.areaId;
     // console.log(areaId);
     var resJson = {};
     for(let json of map_comf){
       // console.log(json.key);
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
