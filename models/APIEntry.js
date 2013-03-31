var db = require('../lib/db');


var APIEntrySchema = db.Schema({
    method: String,
    title: String,
    url: String,
    category:String,
    html:String,
    params:[{name:String, description:String}],
    response:[{name:String, description:String}]
    
});

var APIEntry = db.mongoose.model('APIEntry', APIEntrySchema);

module.exports.findAPIs 		 = findAPIs;
module.exports.addAPIEntry 		 = addAPIEntry;
module.exports.editAPIEntry 	 = editAPIEntry;
module.exports.deleteAPIEntry 	 = deleteAPIEntry;
module.exports.findAllCategories = findAllCategories;

function findAPIs(query,callback) {
	APIEntry.find(query,function (err,instance) {
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

function addAPIEntry(req, callback) {
	var instance = new APIEntry();
	instance.url 		= req.body.api_url;
	instance.method 	= req.body.api_method;
	instance.title 		= req.body.api_title;
	instance.category 	= req.body.api_category;
	instance.html   	= req.body.api_html_data;

	if(req.body.api_category == 'add' && req.body.new_api_category != 'undefined')
	{
		instance.category 	= req.body.new_api_category;
	}

	var params = [];
	if(typeof req.body.api_param_name == "object")
	{
		for(var n=0; n<req.body.api_param_name.length; n++)
		{
		   params[n] = {'name':req.body.api_param_name[n], 'description':req.body.api_param_value[n]};
	    }
	}else if(typeof req.body.api_param_name == "string"){
		   params = {'name':req.body.api_param_name, 'description':req.body.api_param_value};
	}

		
    var response = [];
    if(typeof req.body.api_response_param_name == "object")
    {
    	for(var n=0; n<req.body.api_response_param_name.length; n++)
		{
		   response[n] = {'name':req.body.api_response_param_name[n], 'description':req.body.api_response_param_value[n]};
	    }
    }else if(typeof req.body.api_response_param_name == "string"){
    	   response = {'name':req.body.api_response_param_name, 'description':req.body.api_response_param_value};
    }
	    

    instance.params   = params;
    instance.response = response;

	instance.save(function (err) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, instance);
		}
	});
}

function editAPIEntry(req, callback)
{
	findAPIs({_id:req.body.api_id},function(err,instance){

		instance.url 		= req.body.api_url;
		instance.method 	= req.body.api_method;
		instance.title 		= req.body.api_title;
		instance.category 	= req.body.api_category;
		instance.html   	= req.body.api_html_data;

		if(req.body.api_category == 'add' && req.body.new_api_category != 'undefined')
		{
			instance.category 	= req.body.new_api_category;
		}

		var params = [];
		if(typeof req.body.api_param_name == "object")
		{
			for(var n=0; n<req.body.api_param_name.length; n++)
			{
			   params[n] = {'name':req.body.api_param_name[n], 'description':req.body.api_param_value[n]};
		    }
		}else if(typeof req.body.api_param_name == "string"){
			   params = {'name':req.body.api_param_name, 'description':req.body.api_param_value};
		}

			
	    var response = [];
	    if(typeof req.body.api_response_param_name == "object")
	    {
	    	for(var n=0; n<req.body.api_response_param_name.length; n++)
			{
			   response[n] = {'name':req.body.api_response_param_name[n], 'description':req.body.api_response_param_value[n]};
		    }
	    }else if(typeof req.body.api_response_param_name == "string"){
	    	   response = {'name':req.body.api_response_param_name, 'description':req.body.api_response_param_value};
	    }
		    

	    instance.params   = params;
	    instance.response = response;

	    if(req.body.api_id != 'undefined')
	    {
	    	APIEntry.findByIdAndUpdate(req.body.api_id,instance,function (err) {
				if (err) {
					callback(err);
				}
				else {
					callback(null, instance);
				}
			});
	    }	
	})
}

function deleteAPIEntry(req, callback)
{
	console.log(req.query.id);
	APIEntry.findByIdAndRemove(req.query.id, {}, callback);
}
