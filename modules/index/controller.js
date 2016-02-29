var async = require("async"),
	Handlebars	= require("handlebars");

var exec = function(req, res) {
	var ctx = {};
	req.segments =  lead.segments(req);
	async.parallel({
		context	:function(cb,results){modules['index'].render(req,res,cb) },
		menu	:function(cb,results){modules['menu'].render(req,res,cb) }
	},function(err,results){
		ctx = lead.merge(results);
		res.send(lead.view('index_layout')(ctx));
	});		
}

var routes = ['/'];

exports.admin = {routes:routes,execute:exec};