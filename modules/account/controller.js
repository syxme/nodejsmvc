var async = require("async");

var exec = function(req, res) {
	var ctx = {};
	var segments = hls.segments(req);
	
	async.parallel({
		account	:function(cb,results){modules['account'].render({path:segments,req:req},cb) },
	},function(err,results){
		res.send(results.account);
	});		
}
var routes = ['/signin','/signup'];

exports.account = {routes:routes,execute:exec};