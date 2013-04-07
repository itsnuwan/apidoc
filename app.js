/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

passport.use(new LocalStrategy(routes.login));
passport.serializeUser(function(user, done) {
	//console.log(user);
  done(null, user.username);
});
passport.deserializeUser(routes.deserializeUser);

// Routes
app.get('/api-admin', routes.admin);
app.get('/login', routes.login_page);
app.get('/api-add', routes.add_page);
app.get('/api-edit', routes.edit_page);
app.get('/api-delete', routes.delete);
app.get('/add-api-page', routes.add_api_page);
app.post('/add', routes.add);
app.post('/edit', routes.edit);
app.post('/add-api-intro', routes.add_api_intro);
app.post('/edit-api-intro', routes.edit_api_intro);
app.get('/', routes.find);
app.post('/login',
  passport.authenticate('local', { successRedirect: '/api-admin',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);