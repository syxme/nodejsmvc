var Handlebars = new require("handlebars");
var fs = require('fs')
var tmp;
var	controllers = {}, 
	context = {},
	models = {},
	view = {};

module.exports.ex = function(cb){
	hls.walk("modules", function(err, file) {
		Object.keys(file).forEach(function (num) {
			tmp = require("../"+file[num]);
			if (hls.frs(hls.fn(file[num]))=="hbs"){
				Handlebars.registerPartial(hls.hbsName(file[num]),fs.readFileSync(file[num]));
				view[hls.hbsName(file[num])] = Handlebars.compile(fs.readFileSync(file[num], 'utf8'));					  
			}
			switch (hls.fn(file[num])){
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