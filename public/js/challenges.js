function ChallengeController ($scope){

    var self = this;

    this.activeChallenges = {};


     // Bath
    // var map = L.map('map').setView([51.3755228, -2.375885], 13);
    // Southdown
    var map = L.map('map').setView([51.3700068,-2.3972867], 14);

    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 20, attribution: osmAttrib});

//  var binIcon = L.icon({iconUrl: './assets/bin.png'});
//    iconSize: [38, 95]

    var parks = new L.LayerGroup();

    function parklabels(feature, layer) {
        var popupContent = String(feature.properties.site_name);
        layer.bindPopup(popupContent);
    }

    function parkstyle(feature) {
//    return {color: feature.properties.color};
        return {color: "green",
                opacity: 0.5,
                fillOpacity: 0.2 };
    }
    // subtle green: #3fcd24
    // lurid green: #3fff24

    $.getJSON('./data/banes_gss_amenity_grass.geojson', function (parkadd) {
        my_json = L.geoJson(parkadd, {
          style: parkstyle,
            onEachFeature: parklabels
        });

        my_json.addTo(parks)
    });


    var tweetIcon = new L.Icon({
        iconSize: [27, 27],
        iconAnchor: [13, 27],
        popupAnchor: [1, -24],
        iconUrl: 'assets/twitter-icon-1.png'
    });

    var marker1 = L.marker([51.3688228,-2.3959434], {icon: tweetIcon}).addTo(parks);
    var marker1 = L.marker([51.3705275,-2.3980808], {icon: tweetIcon}).addTo(parks);
    var marker1 = L.marker([51.3736647,-2.3922042], {icon: tweetIcon}).addTo(parks);




    function wardstyle(feature) {
//    return {color: feature.properties.color};
        return {color: "blue",
                fill: false};
    }

    var wards = new L.LayerGroup();
//    $.getJSON('./data/ons_census_2011_ward.geojson', function (wardsadd) {
    $.getJSON('./data/southdown_ward.geojson', function (wardsadd) {
        my_json = L.geoJson(wardsadd, {
          style: wardstyle,
        })
        my_json.addTo(wards);
    });

    var bins = new L.LayerGroup();
    $.getJSON('./data/banes_park_litter_bin.geojson', function (binsadd) {
        L.geoJson(binsadd).addTo(bins);
    });
    $.getJSON('./data/banes_park_dog_bin.geojson', function (binsadd) {
        L.geoJson(binsadd).addTo(bins);
    });

    var binIcon = new L.Icon({
        iconSize: [27, 27],
        iconAnchor: [13, 27],
        popupAnchor: [1, -24],
        iconUrl: 'assets/bin.png'
    });

    function pointToLayer(feature, latlng) {
        return L.marker(latlng, {icon: binIcon});
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
//            style: binstyle,
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
        "Litter bins": newbins
    };

//    var map = L.map('map',
//      { center: [51.3755228, -2.375885],
//        zoom: 13,
//        layers: [baselayers,overlays]
//      });
    map.addLayer(osm);
    map.addLayer(wards);
    map.addLayer(parks);

    L.control.layers(baselayers, overlays).addTo(map);


}

