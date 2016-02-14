var express = require('express');
var inside = require('point-in-polygon');

var fs = require('fs');

var router = express.Router();
var env_health_data = require('../public/data/banes-env-protetct-sr.json');
var ward_data = require('../public/data/southdown_ward.json');

function get_point_data() {

    var polygon = ward_data.features[0].geometry.coordinates[0];
    var points = [];

    env_health_data.data.forEach(function (item) {
        var type = item[9];
        var date = item[12];
        var coords = [Number(item[16][2]), Number(item[16][1])];

        if (inside(coords, polygon) && type.match(/Noise/)) {
            console.log ("got", type, date, coords);
            points.push({coords: coords, date: date, type: type});
        }
    });

    return points;

}
/* GET home page. */
router.get('/', function (req, res, next) {

    res.json({data: get_point_data()});

    //    ward_data.features[0].geometry.coordinates[0]});

});

router.get('/noise.geojson', function (req, res, next) {

    var features = [];

    var id = 1;
    get_point_data().forEach(function (item) {
        var feature = {
            "type": "Feature",
            "properties": {
                "UNIQUEID": id++,
                "TYPE": item.type,
                "SITE_NAME": null,
                "DEDICATION": null,
                "NOTES": null,
                "EASTING": 374431,
                "NORTHING": 165241,
                "UPDATED_BY": "GIS",
                "LAST_UPDAT": "09\/2015",
                "MI_STYLE": null,
                "MI_PRINX": 76
            },
            "geometry": {"type": "Point", "coordinates": [item.coords[0], item.coords[1], 0]}
        };

        features.push(feature);
    });
    var data = {
        type: "FeatureCollection",
        "crs": {
            "type": "name", "properties": {
                "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
            }
        },
        "features": features
    };
    res.json(data);


});

module.exports = router;
