'use strict';

var postAdModule = angular.module('spiderApp.postAdModule', [ 'ngRoute' ]);

postAdModule.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/postad', {
		templateUrl : 'postad/postad.html',
		controller : 'postAdCtrl'
	});
} ]);

postAdModule.controller('postAdCtrl', function($scope, $routeParams, $http, $location, serverConfig) {
	$http.get(serverConfig.url + ':' + serverConfig.port + '/api/categories').success(function(data) {
		$scope.categories = data;
	});

	$scope.postAd = function(ad) {
		console.log('selected category:'  + ad.categoryId);

		$http.post(serverConfig.url + ':' + serverConfig.port + '/api/ad', ad).success(function(data) {
			$scope.ad = data;
			console.log('new advertisement id2: ' + $scope.ad._id);
			$location.path('/ad/' + $scope.ad._id + '/true');
		});

	};
});