var async = require("async");
var _ = require("lodash");

var BasicModule = function(){
   
}
BasicModule.prototype.info = {
	title:"Модуль управления меню",
	link:"Пользователи",
	url:"account"
};

BasicModule.prototype.admin = function(req,callback){
	var ctx = {
		title:"Логин"
	};
	ctx = Engine.view.menu_edit(ctx);
	callback(null,ctx);

}

BasicModule.prototype.render = function(req,callback){
	var ctx = {
		title:"MVC Engine"
	};

	ctx.signin = req.path.segments[0]=="signin"?true:false;

	if (req.req.hbscontex){
		ctx = _.extend(ctx,req.req.hbscontex);
	}

	ctx = Engine.view.account_login_form(ctx);
	callback(null,ctx);
}
module.exports = {account:new BasicModule};