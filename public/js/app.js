/**
 * Created by OCliffe on 13/02/2016.
 */


var app = angular.module('beastie',['ngRoute','leaflet-directive','chart.js','ngtweet','ui.bootstrap'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: 'partials/home.html', controller:HomeController})
            .when('/ward/:ward_id/', {templateUrl: 'partials/ward.html', controller: WardController})
            .when('/ward/:ward_id/challenges/tweet_in_the_park', {templateUrl: 'partials/challenge_tweet_in_the_park.html', controller: ChallengeController})
            .when('/ward/:ward_id/challenges/noisy_neighbors', {templateUrl: 'partials/new_challenge_noisy_neighbors.html', controller: NewChallengeController})
            .when('/ward/:ward_id/challenges/osama_binspection', {templateUrl: 'partials/pending_challenge_osama_binspection.html', controller: PendingChallengeController})

            .otherwise({redirectTo: '/'});;
    }])
    .controller(WardController)
    .controller(HomeController)
    .controller(NewChallengeController)
    .controller(PendingChallengeController)
    .directive('enviromate',Enviromate);




