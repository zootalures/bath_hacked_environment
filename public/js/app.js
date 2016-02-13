/**
 * Created by OCliffe on 13/02/2016.
 */


var app = angular.module('beastie',['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: 'partials/home.html'})
            .when('/ward/:ward_id/', {templateUrl: 'partials/ward.html', controller: WardController})
            .otherwise({redirectTo: '/'});;
    }])
    .controller(WardController);

;



