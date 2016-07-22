var async = require("async");
var _ = require("lodash");

var BasicModule = function(){
   var ctx = {};
}

BasicModule.prototype.info = {
	title:"Dashboard",
	link:"Рабочее место",
	url:"",
	priority:0
};

BasicModule.prototype.admin = function(req,callback){
	var ctx = {
		title:"Меню"
	};
	ctx = lead.view('menu_edit')(ctx);
	callback(null,ctx);

}

BasicModule.prototype.initial = function(req,callback){
	var mname = req.segments[1]==undefined?"":req.segments[1];

	var ctx = {
		title:"Admin Panel",
		admin:true,
		authenticated:false,
		menu:[]
	};

	Object.keys(Engine.context).forEach(function (n) {
		if (Engine.context[n].admin){
			ctx.menu.push(mname == Engine.context[n].info.url?_.extend({active:true},Engine.context[n].info):Engine.context[n].info);
		}
	});
	
	ctx.menu = _.sortBy(ctx.menu,['priority']);
	mname = mname==''?'admin':mname;

	if (mname){
		if (Engine.context[mname]){
			Engine.context[mname].admin(req,function(err,context){
				ctx = _.assign(ctx,Engine.context[mname].info);
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

module.exports  = {admin:new BasicModule};