
/*
 * GET home page.
 */
var APIEntry = require("../models/APIEntry.js")

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.find = function(req, res){
	APIEntry.findAPIs(req.query.api, function(err, entries){
		if(err)
		{
			console.log("ERR:"+err);
		}else{
			APIEntry.findAllCategories(function(err,categories){
				res.render('APIs',{"entries":entries,"categories":categories,"api":req.query.api});
			});
		}
	});
};