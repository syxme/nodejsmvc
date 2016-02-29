var Handlebars = require("handlebars");
var fs = require('fs')
var tmp;

var	controllers = {};
var	context 	= {};
var	models 		= {};
var	view 		= {};

module.exports.ex = function(cb){
	lead.walk("modules", function(err, file) {
		Object.keys(file).forEach(function (num) {
			tmp = require("../"+file[num]);
			if (lead.frs(lead.fn(file[num]))=="hbs"){
				view[lead.hbsName(file[num])] = fs.readFileSync(file[num], 'utf8');
			    Handlebars.partials[lead.hbsName(file[num])] = Handlebars.compile(view[lead.hbsName(file[num])]);			  
			}else{
				switch (lead.fn(file[num])){
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