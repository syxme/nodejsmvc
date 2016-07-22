var async = require("async");

var exec = function(req, res) {
	console.time('admin');
	var ctx = {};
	var segments = lead.segments(req);
	async.parallel({
		context	:function(cb,results){modules['admin'].initial(segments,cb) },
	},function(err,results){
		console.timeEnd('admin');
		if (err){
			res.redirect("/admin/");
		}else{
			res.send(lead.view("admin_layout")(results.context));
		}
	});		
}

var routes = ['/admin/','/admin/:module'];

exports.admin = {routes:routes,execute:exec};