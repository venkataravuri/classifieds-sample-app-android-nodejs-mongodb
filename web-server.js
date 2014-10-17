/**
 * Module dependencies.
 */
var express = require('express'), routes = require('./routes'), categories = require('./routes/categories'), search = require('./routes/search'), adslist = require('./routes/adslist'), ad = require('./routes/ad'), http = require('http'), path = require('path'), mongo = require('mongodb');

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

var loadSampleData = require('./load-sample-images.js');

var Server = mongo.Server, Db = mongo.Db, BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {
	auto_reconnect : true
});
db = new Db('spider_classifieds_db', server);

var loadSampleData = require('./load-sample-data.js');
db.open(function(err, db) {
	if (!err) {
		console.log("Connected to 'spider_classifieds_db' database.");
		loadSampleData.deleteCollections();
		loadSampleData.populateDB();
	}
});

var loadSampleImages = require('./load-sample-images.js');

loadSampleImages.deleteSampleImages(function(err) {
	if (err) {
	} else {
		loadSampleImages.addSampleImages(function(err) {
		});
	}
});

app.get('/api/categories', categories.list);
app.get('/api/ads/:categoryId', adslist.findByCategoryId);
app.get('/api/ad/:adId', ad.findById);
app.post('/api/ad', ad.addAd);
app.get('/api/search/:query', search.search);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});