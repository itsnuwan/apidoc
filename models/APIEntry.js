var db = require('../lib/db');


var APIEntrySchema = db.Schema({
    method: String,
    title: String,
    url: String,
    params:[{name:String, description:String}],
    response:{type:String, status:Boolean, message:String, data:String}
});

var APIEntry = db.mongoose.model('APIEntry', APIEntrySchema);

module.exports.findAllAPIs = findAllAPIs;
module.exports.addAPIEntry = addAPIEntry;

function findAllAPIs(callback) {
	APIEntry.find({},function (err,instance) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, instance);
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