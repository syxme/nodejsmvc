var async = require("async");
var _ = require("lodash");

var BasicModule = function(){
   var ctx = {};
}

BasicModule.prototype.render = function(req,res,callback){
	var ctx = {
		title:"Главная Страница"
		
	}

	if (req.session.user){
		ctx.user = req.session.user;
	}
	
	callback(null,ctx);
}

module.exports  = {index:new BasicModule};