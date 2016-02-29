var async = require("async");

var exec = function(req, res) {
	var ctx = {};
	var segments = lead.segments(req);
	
	async.parallel({
		account	:function(cb,results){modules['account'].render({path:segments,req:req,res:res},cb) },
	},function(err,results){
		res.send(results.account);
	});		
}
var routes = ['/signin','/signup'];

exports.account = {routes:routes,execute:exec};