var express = require('express');
var point_in_polygon = require('point-in-polygon');

var fs = require('fs');

var router = express.Router();
var env_health_data = require('../public/data/banes-env-protetct-sr.json');
var ward_data = require('../public/data/southdown_ward.json');

function get_points(polygon, item){
    var type = item[9];
    var date = item[12];
    var coords  = [item[16][1],item[16][2]];

}
/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({data:get_points});

    //    ward_data.features[0].geometry.coordinates[0]});

});

module.exports = router;
