var storage = require('filestorage').create('./public/img/photos/');
var fs = require('fs');
var fileNames = new Array("1_1.jpg", "2_1.jpg", "3_1.jpg", "4_1.jpg", "5_1.jpg", "6_1.jpg", "7_1.jpg");

module.exports.deleteSampleImages = function(callback) {
	console.log('Deleting files...');
	function fileDeleteRecursive(i) {
		if (i < fileNames.length) {
			fileDelete(fileNames[i], function(err) {
				if (err) {
					console.log('error: ' + err);
				} else {
					fileDeleteRecursive(i + 1);
				}
			});
		}
	}
	fileDeleteRecursive(0);
	callback(null);
};

function fileDelete(fileName, callback) {
	fs.exists('./public/img/photos/' + fileName, function(exists) {
		if (exists) {
			fs.unlinkSync('./public/img/photos/' + fileName);
			console.log(fileName);
			callback(null);
		} else {
			callback(null);
		}
	});
};

module.exports.addSampleImages = function(callback) {
	console.log('Adding files...');
	function fileAddRecursive(i) {
		if (i < fileNames.length) {
			fileAdd(fileNames[i], fileNames[i], function(err) {
				if (err) {
					console.log('error: ' + err);
				} else {
					fileAddRecursive(i + 1);

				}
			});
		}
	}
	fileAddRecursive(0);
	callback(null);
};

function fileAdd(fileName, storeName, callback) {
	fs.readFile('./data/images/' + fileName, function(err, data) {
		if (err) {
			throw err; // Fail if the file can't be read.
		} else {
			fs.writeFile('./public/img/photos/' + storeName, data, function(err) {
				if (err) {
					console.log(err);
					callback(err);
				} else {
					console.log(storeName);
					callback(null);
				}
			});
		}
	});
}
