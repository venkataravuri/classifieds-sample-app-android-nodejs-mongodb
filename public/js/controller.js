'use strict';

spiderApp.controller('categoriesController', function($scope, $http, serverConfig) {
	console.debug('categoriesController about to fire http request to server: ' + serverConfig.url + ' on port: ' + serverConfig.port);
	$http.get(serverConfig.url + ':' + serverConfig.port + '/categories').success(function(data) {
		$scope.categories = data;
	});
});

spiderApp.controller('searchController', function($scope, $routeParams, $http, serverConfig) {
	// Grab customerID off of the route
	var categoryId = ($routeParams.categoryId) ? parseInt($routeParams.categoryId) : 0;
	$http.get(serverConfig.url + ':' + serverConfig.port + '/ads/' + categoryId).success(function(data) {
		$scope.ads = data;
	});
});

spiderApp.controller('adController', function($scope, $routeParams, $http, serverConfig) {
	// Grab advertisement id off of the route
	var adId = ($routeParams.adId) ? parseInt($routeParams.adId) : 0;
	// Grab successful advertisement posting alert flag off of the route
	$scope.postAdAlert = ($routeParams.postAdAlert) ? parseInt($routeParams.postAdAlert) : false;
	$http.get(serverConfig.url + ':' + serverConfig.port + '/ad/' + adId).success(function(data) {
		$scope.ad = data;
	});

	$scope.closeAlert = function() {
		$scope.alert.show = false;
	};
});

spiderApp.controller('postAdController', function($scope, $routeParams, $http, $location, serverConfig) {
	$scope.postAd = function(ad) {
		$http.get(serverConfig.url + ':' + serverConfig.port + '/maxAdId', ad).success(function(maxAdId) {
			ad.id = maxAdId;
			console.log('new advertisement id: ' + ad.id);
			$http.post(serverConfig.url + ':' + serverConfig.port + '/ad', ad).success(function(data) {
				$scope.ad = data;
				console.log('new advertisement id2: ' + $scope.ad.id);
				$location.path('/ad/' + $scope.ad.id + '/true');
			});
		});

	};
});
