var lupus = require('lupus');
var randomstring = require("randomstring");
var util = require('./util.js');

exports.insertAdDocument = function(db, recordCount) {
	lupus(0, recordCount, function(n) {
		// insert a new record.
		db.collection('ads').insert({
			"adId" : n,
			"categoryId" : util.randomInt (1, 100),
			"subCategoryId" : util.randomInt (1, 10),
			"type" : randomstring.generate(20),
			"title" : randomstring.generate(25),
			"desc" : randomstring.generate(50),
			"price" : util.randomInt(1, 5000),
			"isNegotiable" : true,
			"postedOn" : new Date(),
			"updatedOn" : new Date(),
			"address" : randomstring.generate(50),
			"city" : randomstring.generate(20),
			"userId" : randomstring.generate(10),
			"productDetails" : {
				"brandName" : randomstring.generate(20),
				"condition" : 1
			}
		}, {
			w : 1
		}, function(err, records) {
			if (!err) {
				console.log("Document '" + records[0]._id + "' added successufly.");	
			} else {
				console.log("Error while inserting ad document. " + err);
			}

		});
	}, function() {
		console.timeEnd('job-execution-time');
		process.exit(0);
	});	
};
