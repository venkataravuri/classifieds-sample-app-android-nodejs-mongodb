/**
 * New node file
 */
exports.search = function(req, res) {
	var query = req.params.query;
	console.log('Searching ads collection with title regular expression: ' + query);
	db.collection('ads', function(err, collection) {
		collection.find({
			'title' : new RegExp(query, 'i')
		}).toArray(function(err, items) {
			res.json(items);
		});
	});
};
