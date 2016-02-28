var	compile = new require("./compileModules"),
	helpers = require("./utils"),
	models	= require("./models"),
	fs 		= require('fs');

const api = "/api/";

initApi = function(app) {

	compile.ex(function(e){
		module.exports = Engine = e;
		module.exports = modules = e.context;
		module.exports = models = e.models;
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
	});
};

// processRequest
module.exports = initApi;