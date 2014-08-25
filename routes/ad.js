exports.findById = function(req, res) {
	console.log('Finding ad by id: ' + req.params.adId);

	db.collection('ads', function(err, collection) {
		collection.findOne({
			'id' : req.params.adId
		}, function(err, ad) {
			console.log('Retrieved ad: ' + ad.id);
			res.send(ad);
		});
	});
};

exports.addAd = function(req, res) {
	var ad = req.body;

	db.collection('ads', function(err, collection) {
		collection.insert(ad, {
			safe : true
		}, function(err, result) {
			if (err) {
				res.send({
					'error' : 'An error has occurred'
				});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});

};

exports.getMaxAdId = function(req, res) {
	db.collection('ads', function(err, collection) {
		console.log('Retrive ad with max id, to generate sequence number.');
		collection.find({}, {
			'limit' : 1,
			'sort' : [ [ 'id', 'desc' ] ]
		}).toArray(function(err, ads) {
			console.log("Maximum id in ads collection: " + ads.length);
			console.log("Found ad : " + ads[0] + ' max value:' + ads[0].id);

			var id = ++(ads[0].id);
			console.log("New ad id: " + id);
			res.send(id + '');
		});
	});
};
