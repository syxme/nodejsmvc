var async = require("async");
var _ = require("lodash");


var BasicModule = function(){
	
}
BasicModule.prototype.info = {
	title:"Модуль управления меню",
	link:"Заглавное меню",
	url:"menu",
	priority:2

};

BasicModule.prototype.admin = function(req,callback){
	var ctx = {
		title:"Меню"
	};

	async.auto({
		menu:function(cb,results){ models.menu.getMenu(cb)}
	},function(err,results){
		ctx = _.assign(ctx,results.menu);
		ctx = _.assign(ctx,results.list);
		ctx = lead.view('menu_edit')(ctx);
		callback(err,ctx);
	});


}

BasicModule.prototype.render = function(req,res,callback){
	var ctx = {};
	if (req.session.user){
		ctx.user = req.session.user;
	}
	// async.auto({
	// 	users:function(cb,results){ models.User.find({}).exec(cb)}
	// },function(err,results){
	// 	ctx  = {
	// 		menu:results.users
	// 	}
	// 	ctx = Engine.view.menu_index(ctx);
	// 	callback(err,ctx);
	// });
	

	ctx = lead.view('menu_index')(ctx);
	callback(null,ctx);
}
module.exports = {menu:new BasicModule};