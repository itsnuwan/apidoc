var db = require('../lib/db');


var APIEntrySchema = db.Schema({
    method: String,
    title: String,
    url: String,
    category:String,
    params:[{name:String, description:String}],
    response:{type:String, status:Boolean, message:String, data:String}
});

var APIEntry = db.mongoose.model('APIEntry', APIEntrySchema);

module.exports.findAPIs 		 = findAPIs;
module.exports.addAPIEntry 		 = addAPIEntry;
module.exports.findAllCategories = findAllCategories;

function findAPIs(api,callback) {
	APIEntry.find({category:api},function (err,instance) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, instance);
		}
	});
}

function findAllCategories(callback) {
	APIEntry.distinct('category', {}, function (err,categories) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, categories);
		}
	});
}

function addAPIEntry(callback) {
	var instance = new APIEntry();
	instance.method = "POST";
	instance.title = "TEST 123";
	instance.save(function (err) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, instance);
		}
	});
}