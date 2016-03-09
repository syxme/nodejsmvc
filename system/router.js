var	compile = new require("./compileModules"),
	helpers = require("./utils"),
	models	= require("./models"),
	fs 		= require('fs');

const api = "/api/";

initApi = function(app) {

	compile.ex(function(e){

		module.exports = Engine = e;
		module.exports = models = e.models;
		module.exports = modules= e.context;

		Object.keys(e.controllers).forEach(function (i) {

			Object.keys(e.controllers[i].routes).forEach(function(route){
				app.get(e.controllers[i].routes[route], e.controllers[i].execute);
			});
		});

		Object.keys(models).forEach(function (md) {
		 	app.all(api+md+'/*',function(req,res){
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