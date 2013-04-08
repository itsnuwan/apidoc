/*
 * GET home page.
 */
var APIEntry = require("../models/APIEntry.js");
var User 	 = require("../models/User.js");
var API      = require("../models/API.js");

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.admin = function(req, res){

	API.findAPIs({},function(err,apis)
	{
		if(err)
		{
			console.log("ERR:"+err);
		}else{

			if(req.query.api == undefined)
			{
				res.render('admin',{"entries":undefined,"apis":apis,"api":undefined,"msg":req.query.msg});
			}else{
				APIEntry.findAPIs({'category':req.query.api}, function(err, entries){
					res.render('admin',{"entries":entries,"apis":apis,"api":req.query.api,"msg":req.query.msg});
				});
			}			
		}

	});

};

exports.add_page = function(req, res){
	API.findAPIs({}, function(err,apis){
				res.render('add', {"apis":apis});
	});
};

exports.edit_page = function(req, res){
	APIEntry.findAPIs({'_id':req.query.id}, function(err, entry){
		if(err)
		{
			console.log("ERR:"+err);
		}else{
			APIEntry.findAllCategories(function(err,categories){
				res.render('edit',{"entry":entry[0], "categories":categories});
			});
		}
	});
};

exports.find = function(req, res){
	API.findAPIs({}, function(err,apis)
	{
		if(err)
		{
			console.log("ERR:"+err);
		}else{
			var api_to_show= '';

			if(req.query.api == undefined)
			{
				var first_api_name;//add home page html load when no api
				
				if(first_api_name == undefined)
				{
					first_api_name = 'home';
				}

				APIEntry.findAPIs({'category':first_api_name}, function(err, entries){
					res.render('APIs',{"entries":entries,"apis":apis,"api":first_api_name});
				});
				
			}else{
				APIEntry.findAPIs({'category':req.query.api}, function(err, entries){
					res.render('APIs',{"entries":entries,"apis":apis,"api":req.query.api});
				});
			}
			
		}
	});
};

exports.add = function(req, res){
	APIEntry.addAPIEntry(req, function(err){
		if (err) 
		{
			console.log("Error :"+err);
		}else{
			//Redirect to api-admin page
			res.redirect('/api-admin/?api='+req.body.api_category+'&msg=new entry successfully added');
		}
	})
};

exports.edit = function(req, res){
	APIEntry.editAPIEntry(req, function(err){
		if (err) 
		{
			console.log("Error :"+err);
		}else{
			//Redirect to api-admin page
			res.redirect('/api-admin/?api='+req.body.api_category+'&msg=entry successfully updated');
		}
	})
};

exports.delete = function(req, res){
	APIEntry.deleteAPIEntry(req, function(err){
		if (err) 
		{
			console.log("Error :"+err);
		}else{
			//Redirect to api-admin page
			res.redirect('/api-admin/?api='+req.query.api+'&msg=API entry successfully deleted');
		}
	})
};

exports.login = function(username, password, done) {
     User.findUser({ username: username,password: password }, function(err, user) {
       	   if (err) { return done(err); }
       	   //console.log(user);
	       if (!user) {
	         return done(null, false, { message: 'Incorrect username or password.' });
	       }

       return done(null, user);
     }) ;
 };

 exports.login_page = function(req, res){
 	res.render('login');
 };

 exports.deserializeUser = function(id, done) {
   User.findUser({ username: id}, function(err, user) {
  	//var user = {username:"nuwan",password:"123",id:"1234"};
  	//var err = null;
    done(err, user);
  });
};

exports.add_api_intro = function(req, res)
{
	API.addAPI(req, function(err){
		if (err) 
		{
			console.log("Error :"+err);
		}else{
			//Redirect to api-admin page
			res.redirect('/api-admin/?api='+req.body.api_name+'&msg=new api successfully added');
		}
	})
};

exports.edit_api_intro = function(req, res)
{
	API.editAPI(req, function(err){
		if (err) 
		{
			console.log("Error >> :"+err);
		}else{
			//Redirect to api-admin page
			res.redirect('/api-admin/?api='+req.body.api_name+'&msg=api successfully updated');
		}
	})
};

exports.add_api_page = function(req, res){
				res.render('add_api');
};