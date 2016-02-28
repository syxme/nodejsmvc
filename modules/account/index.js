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

BasicModule.prototype.render = function(params,callback){
	var ctx = {
		title:"MVC Engine"
	};

	ctx.signin = params.path.segments[0]=="signin"?true:false;

	if (params.req.session.error){
		ctx = _.extend(ctx,params.req.session.error);
		params.req.session.error = "";
	}

	ctx = Engine.view.account_login_form(ctx);
	callback(null,ctx);
}
module.exports = {account:new BasicModule};