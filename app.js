var express	= require('express'),
	app 	= express(),
	server	= require('http').createServer(app),
	redis	= require('redis'),
	cons		= require('consolidate'),
	bodyParser	= require('body-parser'),
	cookieParser= require('cookie-parser'),
	session		= require('express-session'),
	client 		= redis.createClient(),
	colors		= require('colors'),
	redisStore	= require('connect-redis')(session);



app.set('views', './public');
app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
//openshift app.use(session({ secret: "dfI3dD43220jhsdjjjsdkoen" }));
app.use(session(
	{
		secret: '4815162342x1x2', 
		store: new redisStore({ host: 'localhost', port: 6379, client: client }),
		saveUninitialized: false, 
		resave: false 
}));
var config = require("./system/config");
var routers = require("./system/router")(app);
var port = process.env.OPENSHIFT_NODEJS_PORT || 2518 ;
var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
//console.log(global);


server.listen(port, ip);

console.log("App Started:"+port);
