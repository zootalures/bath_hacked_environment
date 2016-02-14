var express = require('express');
var inside = require('point-in-polygon');
var _ = require('lodash');
var fs = require('fs');

var router = express.Router();
var env_health_data = require('../public/data/banes-env-protetct-sr.json').data;
var ward_data = require('../public/data/southdown_ward.json');

var southdown = ward_data.features[0].geometry.coordinates[0];

function get_point_data() {

    console.log("getting point data from ",env_health_data);
    return _(env_health_data).map( function (item) {
        console.log(item);
        var type = item[9];
        var date = item[12];
        var coords = [Number(item[16][2]), Number(item[16][1])];
        return {coords: coords, date: date, type: type};
    }).value();

}

function filterType(typeRegex) {
    return function (item) {
        return item.type.match(typeRegex);
    }
}
function filterPolygon(polygon) {
    return function (item) {
        inside(item.coords, polygon);
    }
}

function partitionQuarters() {
    return function (item) {
        var date = new Date(Date.parse(item.date));
        return date.getFullYear() + "-" +( Math.floor(date.getMonth() / 4)+1);
    }
}

/* GET home page. */
router.get('/', function (req, res, next) {

    res.json({
        data: _(get_point_data())
            .filter(filterType(/Noise/))
            .filter(filterPolygon(southdown))
            .value()
    });
});


router.get('/byquarter.json', function (req, res, next) {
    var baseData =  _(get_point_data())
        .filter(filterType(/Noise/)).value();

    var allDataByValue   = _(baseData).groupBy(partitionQuarters()).mapValues(function(v){return v.length;}).value();
    var localDataByBalue   = _(baseData).filter(filterPolygon(southdown)).groupBy(partitionQuarters()).mapValues(function(v){return v.length;}).value()

    res.json({mainData: allDataByValue});


});
router.get('/noise.geojson', function (req, res, next) {

    var id = 1;
    var features = _(get_point_data())
        .filter(filterType(/Noise/))
        .filter(filterPolygon(southdown))
        .transform(function (item) {
            return {
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
        }).value();
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
