var async = require("async");

var exec = function(req, res) {
	var ctx = {};
	var segments = lead.segments(req);
	if (req.session.user){
		if (req.session.user.access!="root"){
			return res.status(401).send("no access");
		}
	}else{
		return res.status(401).send("no access");
	}

	async.parallel({
		context	:function(cb,results){modules['admin'].initial(segments,cb) },
	},function(err,results){
		res.send(lead.view("admin_layout")(results.context));
	});		
}

var routes = ['/admin/','/admin/:module'];

exports.index = {routes:routes,execute:exec};