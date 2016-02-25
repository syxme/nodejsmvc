var async = require("async");

var exec = function(req, res) {
	var ctx = {};
	var segments = hls.segments(req);
	async.parallel({
		context	:function(cb,results){modules['admin'].initial(segments,cb) },
	},function(err,results){
		res.send(Engine.view.admin_layout(results.context));
	});		
}

var routes = ['/admin/','/admin/:module'];

exports.index = {routes:routes,execute:exec};