var _ = require('lodash');


module.exports = function (req,res,next){
	var path = req.route.path;
	res.ctx = {};
	segments = _.without(req.path.split('/'), "");
	req.segments = segments;
	if (req.session.user){
		res.ctx.user = req.session.user
	}else{
		res.ctx.user = false;		
	}
	next();

}