var async = require("async");
var _ = require("lodash");

var index = function(){
   var ctx = {};
}
index.prototype.adctx = {
	title:"Рабочее место",
	link:"Рабочее место",
	url:""
};

index.prototype.admin = function(req,callback){
	var segments = req.segments.segments;
	var ctx = {
		title:"Admin Panel",
		admin:true,
		authenticated:false,
		menu:[]
	};

	Object.keys(Engine.context).forEach(function (n) {
		if (Engine.context[n].admin){
			if (segments[1] == Engine.context[n].adctx.url){
				ctx.menu.push(_.assign(Engine.context[n].adctx,{active:true}));
			}else{
				ctx.menu.push(Engine.context[n].adctx);
			}
		}
	});

	if (segments[1]){
		if (Engine.context[segments[1]]){
			Engine.context[segments[1]].admin(req,function(err,context){
				ctx = _.assign(ctx,Engine.context[segments[1]].adctx);
				ctx.module = context;
				callback(null,ctx);
			});
		}else{
			callback("error",'ERROR');

		}
	}else{

		callback(null,ctx);
	}
}

module.exports  = {admin:new index};