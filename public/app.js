'use strict';

var spiderApp = angular.module('spiderApp', [ 'mgcrea.ngStrap', 'ngRoute', 'spiderApp.sharedModule', 'spiderApp.categoriesModule',
		'spiderApp.postAdModule', 'spiderApp.adsModule', 'spiderApp.adModule' ]);

spiderApp.constant("serverConfig", {
	"url" : "http://localhost",
	"port" : "3000"
});

spiderApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({
		redirectTo : '/categories'
	});
} ]);
