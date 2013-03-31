/*
 * GET home page.
 */
var APIEntry = require("../models/APIEntry.js");
var User 	 = require("../models/User.js")

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.admin = function(req, res){

	APIEntry.findAllCategories(function(err,categories)
	{
		if(err)
		{
			console.log("ERR:"+err);
		}else{
			var api_to_show= '';

			if(req.query.api == undefined)
			{
				api_to_show = categories[0];
			}else{
				api_to_show = req.query.api;
			}

			APIEntry.findAPIs({'category':api_to_show}, function(err, entries){
				res.render('admin',{"entries":entries,"categories":categories,"api":api_to_show});
			});
		}

	});

};

exports.add_page = function(req, res){
	APIEntry.findAllCategories(function(err,categories){
				res.render('add', {"categories":categories});
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
	APIEntry.findAllCategories(function(err,categories)
	{
		if(err)
		{
			console.log("ERR:"+err);
		}else{
			var api_to_show= '';

			if(req.query.api == undefined)
			{
				api_to_show = categories[0];
			}else{
				api_to_show = req.query.api;
			}

			APIEntry.findAPIs({'category':api_to_show}, function(err, entries){
				res.render('APIs',{"entries":entries,"categories":categories,"api":api_to_show});
			});
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
			res.redirect('/api-admin/?api='+req.query.api+'&msg=new entry successfully deleted');
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
}



