'use strict';

var adModule = angular.module('spiderApp.adModule', [ 'ngRoute' ]);

adModule.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/ad/:adId/:postAdAlert', {
		templateUrl : 'ad/ad.html',
		controller : 'adCtrl'
	});
} ]);

adModule.controller('adCtrl', function($scope, $routeParams, $http, serverConfig) {
	// Grab advertisement id off of the route
	var adId = ($routeParams.adId) ? parseInt($routeParams.adId) : 0;
	// Grab successful advertisement posting alert flag off of the route
	$scope.postAdAlert = ($routeParams.postAdAlert  == "true") ? true : false;
	$http.get(serverConfig.url + ':' + serverConfig.port + '/api/ad/' + adId).success(function(data) {
		$scope.ad = data;
	});

	$scope.closeAlert = function() {
		$scope.alert.show = false;
	};
});
