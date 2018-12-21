'use strict';

var categoriesModule = angular.module('spiderApp.categoriesModule', [ 'ngRoute' ]);

categoriesModule.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/categories', {
		templateUrl : 'categories/categories.html',
		controller : 'categoriesCtrl'
	});
} ]);

categoriesModule.controller('categoriesCtrl', function($scope, $http, serverConfig) {
	console.debug('categoriesController about to fire http request to server: ' + serverConfig.url + ' on port: ' + serverConfig.port);
	$http.get(serverConfig.url + ':' + serverConfig.port + '/api/categories').success(function(data) {
		$scope.categories = data;
	});
});