// modules =================================================
var express        = require('express');
var path           = require('path');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var fs             = require('fs');
var dao            = require('./utils/dao.js');
var passport       = require('passport');
var models = [];

var config = require('./config')();
mongoose.connect(config.dburl); 
require(path.join(__dirname,'utils','local-auth.js'))(app,passport);
// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(passport.initialize());
app.use(passport.session());
// routes ==================================================
require('./routes/index.js')(app,passport); // pass our application into our routes

// start app ===============================================
app.listen(config.port);
exports = module.exports = app; 						// expose app