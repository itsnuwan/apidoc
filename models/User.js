var db = require('../lib/db');


var UserSchema = db.Schema({
    username: String,
    password: String   
});

var User = db.mongoose.model('User', UserSchema, 'users');

module.exports.findUser 		 = findUser;

function findUser(query, callback)
{
	User.find(query,function (err,instance) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, instance[0]);
		}
	});
}