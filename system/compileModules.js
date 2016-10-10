var Handlebars = require("handlebars");
var fs = require('fs')
var tmp;

var	controllers = {};
var	context 	= {};
var	models 		= {};
var	view 		= {};

module.exports.ex = function(cb){
	lead.walk("modules", function(err, file) {
		for (i in file) {
			tmp = require("../"+file[i]);
			if (lead.frs(lead.fn(file[i]))=="hbs"){
				view[lead.hbsName(file[i])] = fs.readFileSync(file[i], 'utf8');
				Handlebars.partials[lead.hbsName(file[i])] = Handlebars.compile(view[lead.hbsName(file[i])]);			  
			}else{
				switch (lead.fn(file[i])){
					case config.compiler.scanOptions.index:
					context[Object.keys(tmp)] = tmp[Object.keys(tmp)];
					break;
					case config.compiler.scanOptions.model:					
					models[Object.keys(tmp)] = tmp[Object.keys(tmp)];
					break;
					case config.compiler.scanOptions.controller:
					controllers[Object.keys(tmp)] = tmp[Object.keys(tmp)];
					break;
					default:
					break;
				}
			}
		};

		lead.walk("templates", function(err, file) {
			for (i in file) {
				get_tpl_seg();//проверка
			}
		});

		var engine = {
			controllers	:controllers,
			context		:context,
			models		:models,
			view		:view
		}

		cb(engine);	
	});
}