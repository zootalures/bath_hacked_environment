/**
 * Created by OCliffe on 13/02/2016.
 */
function HomeController($scope) {
    $scope.wards = [
        {mate: {base: "high", co2: "low", sound:"high"},id: 'southdown', name:'Southdown'},
        {mate: {base: "mid", co2: "low", sound:"low"},id: 'southdown', name:'Oldfield Park'},
        {mate: {base: "mid", co2: "high", sound:"low"},id: 'southdown', name:'Twerton'},

        {mate: {base: "low", co2: "low", sound:"mid"},id: 'widcombe', name:'Widcombe'},
        {mate: {base: "low", co2: "low", sound:"high"},id: 'kingsmead', name:'Lambridge'},
        {mate: {base: "mid", co2: "low", sound:"high"},id: 'landsdown', name:'Landsdown'},

        {mate: {base: "low", co2: "low", sound:"mid"},id: 'newbridge', name:'Newbridge'},
        {mate: {base: "low", co2: "low", sound:"mid"},id: 'southdown', name:'Bathavon'},
        {mate: {base: "low", co2: "low", sound:"high"},id: 'walcot', name:'Walcot'}



    ]
}