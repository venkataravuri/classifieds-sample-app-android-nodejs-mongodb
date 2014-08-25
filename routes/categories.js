/**
 * New node file
 */
exports.list = function(req, res) {
	db.collection('categories', function(err, collection) {
		console.log('Retrieving categories from database.');
		collection.find().toArray(function(err, categories) {
			res.send(categories);
		});
	});
	// res.json(categories);
};