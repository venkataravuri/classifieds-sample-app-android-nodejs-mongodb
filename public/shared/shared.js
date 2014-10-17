'use strict';

var sharedModule = angular.module('spiderApp.sharedModule', [ 'ngRoute' ]);

sharedModule.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/ads/search/:query', {
		templateUrl : 'ads/ads.html',
		controller : 'searchCtrl'
	});
} ]);

sharedModule.controller('searchCtrl', function($scope, $routeParams, $http, $location, serverConfig) {
	$scope.searchAds = function() {
		$location.path('/ads/search/' + $scope.query);
	};

});