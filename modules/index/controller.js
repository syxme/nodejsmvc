var async = require("async"),
	Handlebars	= require("handlebars");
var _ = require("lodash");


var exec = function(req, res) {
	console.time('test');
	var ctx = {};
	var module;
	req.segments =  lead.segments(req);

	if (req.module){
		module = function(cb,results){modules[req.module].render(req,res,cb)};
	}else{
		module = function(cb,results){cb(null,null)};
	}
	
	async.parallel({
		context	:function(cb,results){modules['index'].render(req,res,cb) },
		menu	:function(cb,results){modules['menu'].render(req,res,cb) },
		module	:module 
	},function(err,results){
		ctx = lead.merge(results);
  		_.assign(ctx,ctx.module);
		//ctx = (req.module)?ctx.module.title:ctx.title;
		console.timeEnd('test');
		res.send(lead.view('index_layout')(ctx));
	});		
}

var routes = ['/'];

exports.index = {routes:routes,execute:exec};