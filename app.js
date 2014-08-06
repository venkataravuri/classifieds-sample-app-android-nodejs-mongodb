angular.module('spiderApp.service', []);
angular.module('spiderApp.directive', []);
angular.module('spiderApp.filter', []);
angular.module('spiderApp', ['spiderApp.service', 'spiderApp.directive', 'spiderApp.filter']) 
  .controller('searchController', function($scope){
    $scope.ads = [
  {
    "id": "1",
	"title": "Samsung Printer",
	"desc": "Brand new Samsung printer (SCX-2000), not used.",
	"price" : "149.99",
    "imageUrl": "img/1.png",
  },
  {
    "id": "2",
	"title": "Rockrider Bike",
	"desc": "Rockrider cycle in good condition.",
	"price" : "99.99",
    "imageUrl": "img/2.png",
  },
]
  });
