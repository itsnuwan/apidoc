
/*
 * GET home page.
 */
var APIEntry = require("../models/APIEntry.js")

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.find = function(req, res){
	APIEntry.findAllAPIs(function(err, entries){
		if(err)
		{
			console.log("ERR:"+err);
		}else{
			console.log(entries);
			res.render('APIs',{"entries":entries});
		}
	});
	
};