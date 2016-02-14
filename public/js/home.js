/**
 * Created by OCliffe on 13/02/2016.
 */
function HomeController($scope) {
    $scope.wards = [
        {mate: {base: "high", co2: "low", sound: "high", scale: 300}, id: 'southdown', name: 'Southdown'},
        {mate: {base: "mid", co2: "low", sound: "low", scale: 300}, id: 'southdown', name: 'Oldfield Park'},
        {mate: {base: "mid", co2: "high", sound: "low", scale: 300}, id: 'southdown', name: 'Twerton'},

        {mate: {base: "low", co2: "low", sound: "mid",  scale:300}, id: 'widcombe', name: 'Widcombe'},
        {mate: {base: "low", co2: "low", sound: "high",  scale:300}, id: 'kingsmead', name: 'Lambridge'},
        {mate: {base: "mid", co2: "low", sound: "high",  scale:300}, id: 'landsdown', name: 'Landsdown'},

        {mate: {base: "low", co2: "low", sound: "mid",  scale:300}, id: 'newbridge', name: 'Newbridge'},
        {mate: {base: "low", co2: "low", sound: "mid",  scale:300}, id: 'southdown', name: 'Bathavon'},
        {mate: {base: "low", co2: "low", sound: "high", scale:300}, id: 'walcot', name: 'Walcot'}

    ]
}