var lupus = require('lupus');
var randomstring = require("randomstring");
var util = require('./util.js');

exports.updateAds = function(db, recordCount) {
	console.log("Starting updating Ads documents into 'db_spider_classifieds' collection.");
	lupus(0, recordCount, function(n) {
		// insert a new record.
		db.collection('ads').findAndModify({
			title : new RegExp('^' + randomstring.generate(2) + '.*')
		}, [], {
			$set : {
				price : util.randomInt(100, 5000)
			}
		}, function(err, updatedAd) {
			if (!err) {
				console.log("Document with title '" + updatedAd.title + "' updated successfully.");
			} else {
				console.log("Error while finding & updating ad document. " + err);
			}
		});
	}, function() {
		console.timeEnd('job-execution-time');
		process.exit(0);
	});
};
