var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var lupus = require('lupus');

var loadTestData = require('./modules/load-test-data.js');
var updateTestData = require('./modules/update-test-data.js');

var option = process.argv[2];
var recordCount = process.argv[3];

// connect away
MongoClient.connect('mongodb://127.0.0.1:27017/db_spider_classifieds', function(err, db) {
	if (err)
		throw err;
	console.log("Connected to Database");
	console.time('job-execution-time');
	if (option == "LOAD") {
		loadTestData.insertAdDocument(db, recordCount);
	} else if (option == "UPDATE") {
		updateTestData.updateAds(db, recordCount);
	}
});