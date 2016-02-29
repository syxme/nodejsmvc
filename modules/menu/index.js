var async = require("async");
var BasicModule = function(){
   
}
BasicModule.prototype.info = {
	title:"Модуль управления меню",
	link:"Заглавное меню",
	url:"menu"
};

BasicModule.prototype.admin = function(req,callback){
	var ctx = {
		title:"Меню"
	};
	ctx = lead.view('menu_edit')(ctx);
	callback(null,ctx);

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