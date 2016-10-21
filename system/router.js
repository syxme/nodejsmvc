var	compile = new require("./compileModules"),
helpers = require("./utils"),
model	= require("./models"),
fs 		= require('fs');
pedata 	= require('./middleware/pedata');
const api = "/api/";
var subvars = function (req,res,next) {
	
}
initApi = function(app) {

	compile.ex(function(e){

		module.exports = Engine = e;
		module.exports = models = e.models;
		module.exports = modules= e.context;

		Object.keys(e.controllers).forEach(function (i) {

			Object.keys(e.controllers[i].routes).forEach(function(route){
				console.log("ROUTE:"+e.controllers[i].routes[route]);
				if (e.controllers[i].execute){
					app.get(e.controllers[i].routes[route],[pedata,e.controllers[i].execute]);
				}else{
					app.get(e.controllers[i].routes[route], [pedata,function (req,res,next) {
						req.module = i;
						next();
					},e.controllers.index.execute]);
				}
			});
		});

		Object.keys(models).forEach(function (md) {
			console.log(api+md+'/*');
			app.post(api+md+'/*',function(req,res){
				models[md].processRequest(req,res);
			});
		});
		//404

		app.get('*', function(req, res){
			res.status(404).send('what???');
		});

	});
};


module.exports = initApi;