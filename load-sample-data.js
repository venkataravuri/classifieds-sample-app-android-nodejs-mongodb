/*--------------------------------------------------------------------------------------------------------------------*/
// Populates spider_classifieds_db database with sample data -- Only used once:
// the first time the application is started.
// You'd typically not find this code in a real-life app, since the database
// would already exist.
var countersJSON = require('./data/counters.json');
var usersJSON = require('./data/users.json');
var categoriesJSON = require('./data/categories.json');
var adsJSON = require('./data/ads.json');

module.exports.populateDB = function() {

	db.collection('counters', function(err, collection) {
		collection.insert(countersJSON, {
			safe : true
		}, function(err, result) {
			if (err) {
				console.log(err.message);
			} else {
				console.log("counters are sucessfully populated.");
			}
		});
	});

	db.collection('users', function(err, collection) {
		collection.insert(usersJSON, {
			safe : true
		}, function(err, result) {
			if (err) {
				console.log(err.message);
			} else {
				console.log("users are sucessfully populated.");
			}
		});
	});

	db.collection('categories', function(err, collection) {
		collection.insert(categoriesJSON, {
			safe : true
		}, function(err, result) {
			if (err) {
				console.log(err.message);
			} else {
				console.log("categories are sucessfully populated.");
			}
		});
	});

	db.collection('ads', function(err, collection) {
		collection.insert(adsJSON, {
			safe : true
		}, function(err, result) {
			if (err) {
				console.log(err.message);
			} else {
				console.log("Ads are sucessfully populated.");
			}
		});
	});

};

module.exports.deleteCollections = function() {

	db.collection('counters', function(err, countersCollection) {
		countersCollection.remove({}, function(err, removed) {
			if (err) {
				console.log('Unable to delete counters collection.', err.message);
			} else {
				console.log('counters collection deleted.');
			}
		});
	});

	db.collection('users', function(err, collection) {
		collection.remove({}, function(err, removed) {
			if (err) {
				console.log('Unable to delete users collection.', err.message);
			} else {
				console.log('users collection deleted.');
			}
		});
	});

	db.collection('ads', function(err, adsCollection) {
		adsCollection.remove({}, function(err, removed) {
			if (err) {
				console.log('Unable to delete ads collection.', err.message);
			} else {
				console.log('Ads collection deleted.');
			}
		});
	});

	db.collection('categories', function(err, categoriesCollection) {
		categoriesCollection.remove({}, function(err, removed) {
			if (err) {
				console.log('Unable to delete categories collection.', err.message);
			} else {
				console.log('CategoriesCollection collection deleted.');
			}
		});
	});
};