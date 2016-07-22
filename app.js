var express	= require('express'),
	app 	= express(),
	server	= require('http').createServer(app),
	//redis	= require('redis'),
	mongoose = require("mongoose"),
	bodyParser	= require('body-parser'),
	cookieParser= require('cookie-parser'),
	session		= require('express-session'),
	Handlebars	= require("handlebars");

	//client 		= redis.createClient(),
	//redisStore	= require('connect-redis')(session);


app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(session({ secret: "dfI3dD43220jhsdjjjsdkoen",saveUninitialized: true,resave: true}));

mongoose.plugin(require('./system/shemaAccess'));

// app.use(session(
// 	{
// 		secret: '4815162342x1x2', 
// 		store: new redisStore({ host: 'localhost', port: 6379, client: client }),
// 		saveUninitialized: false, 
// 		resave: false 
// }));


var config = require("./system/config");
var routers = require("./system/router")(app);

var port = process.env.OPENSHIFT_NODEJS_PORT || 2518 ;
var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
//console.log(global);


server.listen(port, ip);

console.log("work engine "+ip+':'+port);
