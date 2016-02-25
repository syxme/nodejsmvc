var async = require("async");
var _ = require("lodash");

var exec = function(req, res) {
	var ctx = {};
	var segments = hls.segments(req);
	//console.log(Engine);
	async.parallel({
		context	:function(cb,results){modules['index'].render({segments:segments},cb) },
		header	:function(cb,results){cb(null,Engine.view.index_header(ctx))},
		footer	:function(cb,results){cb(null,Engine.view.index_footer(ctx))},
		scripts	:function(cb,results){cb(null,Engine.view.index_scripts(ctx))},
		menu	:function(cb,results){modules['menu'].render({},cb) }
	},function(err,results){
		ctx = hls.merge(results);
		// console.log(ctx);
		res.send(Engine.view.index_layout(ctx));
	});		
}

var routes = ['/','/admin/','/admin/:module'];

exports.index = {routes:routes,execute:exec};