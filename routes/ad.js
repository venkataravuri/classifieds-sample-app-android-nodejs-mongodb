exports.findById = function(req, res) {
	db.collection('ads', function(err, collection) {
		console.log('Finding ad by id: ' + req.params.adId);
		collection.findOne({
			"_id" : req.params.adId
		}, function(err, ad) {
			if (err) {
				console.log('Error while retrieving ad with id: ' + req.params.adId + '. error:' + err.message);
			} else {
				if (ad) {
					console.log('Retrieved ad: ' + ad._id);
				}
				res.send(ad);
			}
		});
	});
};

exports.addAd = function(req, res) {
	var ad = req.body;

	getNextSequence("adId", function(err, id) {
		ad._id = id.toString();
		console.log('ad sequence number: ' + ad._id);
		db.collection('ads', function(err, collection) {
			collection.insert(ad, {
				safe : true
			}, function(err, result) {
				if (err) {
					console.log('Error: ' + err.message);
					res.send({
						'error' : 'An error has occurred'
					});
				} else {
					console.log('Success: ' + JSON.stringify(result[0]));
					res.send(result[0]);
				}
			});
		});
	});

};

function getNextSequence(name, callback) {
	console.log('Get sequence for : ' + name);
	db.collection('counters', function(err, collection) {
		collection.findAndModify({
			_id : "adId"
		}, // query
		[], // sort order
		{
			$inc : {
				seq : 1
			}
		}, // update
		{
			'new' : true,
			'upsert' : true,
		}, // options
		function(err, object) {
			if (err) {
				console.log('error while generating next sequence id: ' + err.message);
				callback(err, null);
			} else {
				console.log('Next sequence id: ' + object.seq);
				callback(null, object.seq);
			}
		});
	});
};

