var db = require('../lib/db');

var APISchema = db.Schema({
    name: String,
    title: String,
    html: String
});

var API = db.mongoose.model('API', APISchema);

module.exports.addAPI 		 = addAPI;
module.exports.editAPI 		 = editAPI;
module.exports.findAPIs      = findAPIs;

function addAPI(req, callback)
{
	var instance = new API();
	instance.name		= req.body.api_name;
	instance.title 		= req.body.api_title;
	instance.html   	= req.body.add_api_intro;

	instance.save(function (err) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, instance);
		}
	});
}

function editAPI(req, callback)
{
	findAPIs({_id:req.body.api_id},function(err,instance){

		instance.title 	= req.body.api_title;
		instance.html 	= req.body.api_intro;

		if(req.body.api_name != 'undefined')
	    {
	    	API.findByIdAndUpdate(req.body.api_id,instance,function (err) {
				if (err) {
					callback(err);
				}
				else {
					callback(null, instance);
				}
			});
	    }
		
	});
}

function findOneAPI(query, callback)
{
	API.find(query,function (err,instance) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, instance[0]);
		}
	});
}

function findAPIs(query, callback)
{
		API.find(query,function (err,instances) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, instances);
		}
	});
}
