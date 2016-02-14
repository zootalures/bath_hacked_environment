function ChallengeController ($scope){

    var self = this;

    this.activeChallenges = {};


    var map = L.map('map').setView([51.3755228, -2.375885], 13);

    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 20, attribution: osmAttrib});

//  var binIcon = L.icon({iconUrl: './assets/bin.jpg'});
//    iconSize: [38, 95]

    var parks = new L.LayerGroup();

    function parklabels(feature, layer) {
//              layer.bindPopup("Here");
//  return L.circleMarker(latlng, eqstyle).bindPopup(popupContent, popupOptions);
        var popupContent = String(feature.properties.site_name);
        layer.bindPopup(popupContent);
    }

    function parkstyle(feature) {
//    return {color: feature.properties.color};
        return {color: "red"};
    }

    $.getJSON('./data/banes_gss_amenity_grass.geojson', function (parkadd) {
        L.geoJson(parkadd).addTo(parks, {
//          style: parkstyle,
            onEachFeature: parklabels
        });
    });

    var wards = new L.LayerGroup();
    $.getJSON('./data/ons_census_2011_ward.geojson', function (wardsadd) {
        L.geoJson(wardsadd).addTo(wards);
    });

    var bins = new L.LayerGroup();
    $.getJSON('./data/banes_park_litter_bin.geojson', function (binsadd) {
        L.geoJson(binsadd).addTo(bins);
    });
    $.getJSON('./data/banes_park_dog_bin.geojson', function (binsadd) {
        L.geoJson(binsadd).addTo(bins);
    });

    var smallIcon = new L.Icon({
//     options: {
        iconSize: [27, 27],
        iconAnchor: [13, 27],
        popupAnchor: [1, -24],
        iconUrl: 'assets/bin.jpg'
//     }
    });

    function popupStyle(feature) {
        return {
            radius: 8,
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
            iconUrl: './assets/bin.jpg'
        }
    }

    function pointToLayer(feature, latlng) {
        return L.marker(latlng, smallIcon);
    }

    function onEachPoint(feature, layer) {
//              layer.bindPopup("Here");
//  return L.circleMarker(latlng, eqstyle).bindPopup(popupContent, popupOptions);
        var popupContent = String(feature.properties.SITE_NAME);
        layer.bindPopup(popupContent);
    }

    function binstyle(feature) {
//    return {color: feature.properties.color};
        return {color: "blue"};
    }

    var newbins = new L.LayerGroup();
    $.getJSON('./data/banes_park_litter_bin.geojson', function (binsnew) {
        my_json = L.geoJson(binsnew, {
            style: binstyle,
            pointToLayer: pointToLayer,
            onEachFeature: onEachPoint
        });

        my_json.addTo(newbins);
    });


    var baselayers = {
        "Base map": osm
    };

    var overlays = {
        "Wards": wards,
        "Amenity grass areas": parks,
        "Litter and dog bins": bins,
        "Litter and dog bins custom jpgs": newbins
    };

//    var map = L.map('map',
//      { center: [51.3755228, -2.375885],
//        zoom: 13,
//        layers: [baselayers,overlays]
//      });
    map.addLayer(osm);

    L.control.layers(baselayers, overlays).addTo(map);
}