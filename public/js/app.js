'use strict';
var spiderApp = angular.module('spiderApp', [ 'ui.bootstrap', 'ngRoute' ]);

spiderApp.constant("serverConfig", {
	"url" : "http://localhost",
	"port" : "3000"
});

spiderApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/ads/:categoryId', {
		templateUrl : 'partials/ads.html',
		controller : 'adListController'
	}).when('/ads/search/:query', {
		templateUrl : 'partials/ads.html',
		controller : 'adSearchController'
	}).when('/ad/:adId/:postAdAlert', {
		templateUrl : 'partials/ad.html',
		controller : 'adController'
	}).when('/post-ad', {
		templateUrl : 'partials/post-ad.html',
		controller : 'postAdController'
	}).when('/categories', {
		templateUrl : 'partials/categories.html',
		controller : 'categoriesController'
	}).otherwise({
		redirectTo : '/categories'
	});
} ]);