/**
 * Module dependencies.
 */
var express = require('express'), routes = require('./routes'), categories = require('./routes/categories'), search = require('./routes/search'), ads = require('./routes/ads'), ad = require('./routes/ad'), http = require('http'), path = require('path'), mongo = require('mongodb');

var app = express();

var async = require("async");

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
// Call to compress content
app.use(express.compress());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.send(500, 'Something broke!');
});

var Server = mongo.Server, Db = mongo.Db, BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {
	auto_reconnect : true
});
db = new Db('spider_classifieds_db', server);

db.open(function(err, db) {
	if (!err) {
		console.log("Connected to 'spider_classifieds_db' database");
		db.collection('categories', {
			strict : true
		}, function(err, collection) {
			if (err) {
				console.log("The 'categories' collection doesn't exist. Creating it with sample data...");
				populateDB();
			}
		});
	}
});
app.get('/categories', categories.list);
app.get('/ads/:categoryId', ads.findByCategoryId);
app.get('/ad/:adId', ad.findById);
app.post('/ad', ad.addAd);
app.get('/maxAdId', ad.getMaxAdId);
app.get('/search/:query', search.search);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

/*--------------------------------------------------------------------------------------------------------------------*/
// Populates spider_classifieds_db database with sample data -- Only used once:
// the first time the application is started.
// You'd typically not find this code in a real-life app, since the database
// would already exist.
var populateDB = function() {

	var categories = [ {
		"id" : "1",
		"title" : "Mobiles & Tablets",
		"icon" : "phone"
	}, {
		"id" : "2",
		"title" : "Electronics & Computers",
		"icon" : "hdd"
	}, {
		"id" : "3",
		"title" : "Home & Furniture",
		"icon" : "th"
	}, {
		"id" : "4",
		"title" : "Real Estate",
		"icon" : "home"
	}, {
		"id" : "5",
		"title" : "Clothing & Accessories",
		"icon" : "shopping-cart"
	}, {
		"id" : "6",
		"title" : "Others",
		"icon" : "shopping-cart"
	} ];

	var ads = [ {
		"id" : "1",
		"categoryId" : "1",
		"title" : "Samsung Galaxy Note 3",
		"desc" : "Brand new Samsung Galaxy Note 3.",
		"price" : "25000",
		"imageUrl" : ""
	}, {
		"id" : "2",
		"categoryId" : "1",
		"title" : "Nokia Lumia 710",
		"desc" : "Used Nokia Lumia 712, good condition with all accessories.",
		"price" : "5000",
		"imageUrl" : ""
	}, {
		"id" : "3",
		"categoryId" : "2",
		"title" : "Samsung Printer",
		"desc" : "Brand new Samsung printer (SCX-2000), In orignal box, not used.",
		"price" : "149.99",
		"imageUrl" : "img/1.png"
	}, {
		"id" : "4",
		"categoryId" : "6",
		"title" : "Rockrider Bike",
		"desc" : "Rockrider cycle in good condition.",
		"price" : "99.99",
		"imageUrl" : "img/2.png"
	} ];

	db.collection('categories', function(err, collection) {
		collection.insert(categories, {
			safe : true
		}, function(err, result) {
		});
	});

	db.collection('ads', function(err, collection) {
		collection.insert(ads, {
			safe : true
		}, function(err, result) {
		});
	});

};
