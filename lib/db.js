var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports.mongoose = mongoose;
module.exports.Schema = Schema;
// Connect to cloud database
var username = ""
var password = "";
var address = '127.0.0.1/apidoc';
connect();
// Connect to mongo
function connect() {
//var url = 'mongodb://' + username + ':' + password + address;
var url = 'mongodb://' + address;
mongoose.connect(url);
}
function disconnect() {mongoose.disconnect()}