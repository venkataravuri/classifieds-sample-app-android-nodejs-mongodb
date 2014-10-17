'use strict';

var adsModule = angular.module('spiderApp.adsModule', [ 'ngRoute' ]);

adsModule.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/ads/:categoryId', {
		templateUrl : 'ads/ads.html',
		controller : 'adsCtrl'
	});
} ]);

adsModule.controller('adsCtrl', function($scope, $routeParams, $http, serverConfig) {
	// Grab search query off of the route
	var query = $routeParams.query;
	if (query != null) {
		$http.get(serverConfig.url + ':' + serverConfig.port + '/api/search/' + query).success(function(data) {
			$scope.ads = data;
		});
		return;
	}
	// Grab customerID off of the route
	var categoryId = ($routeParams.categoryId) ? parseInt($routeParams.categoryId) : 0;
	if (categoryId != 0) {
		$http.get(serverConfig.url + ':' + serverConfig.port + '/api/ads/' + categoryId).success(function(data) {
			$scope.ads = data;
		});
	}
});
