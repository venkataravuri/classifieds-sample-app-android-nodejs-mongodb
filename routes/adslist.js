exports.findByCategoryId = function(req, res) {
	var categoryId = req.params.categoryId;
	console.log('Finding ads by category id: ' + categoryId);

	db.collection('ads', function(err, collection) {
		collection.find({
			'categoryId' : categoryId
		}).toArray(function(err, ads) {
			console.log('Found ads: ' + ads.length);
			res.send(ads);
		});
	});
};