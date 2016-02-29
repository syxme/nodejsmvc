var async = require("async");
var _ = require("lodash");

var BasicModule = function(){
   
}
BasicModule.prototype.info = {
	title:"Пользователи",
	link:"Пользователи",
	url:"account"
};

BasicModule.prototype.admin = function(req,callback){
	var ctx = {
		title:"Логин"
	};
	ctx = lead.view("menu_edit")(ctx);
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

	if (params.req.session.info){
		ctx = _.extend(ctx,params.req.session.info);
		params.req.session.info = "";
	}

	ctx = lead.view("account_login_form")(ctx);

	if (params.req.session.user){
		params.res.redirect('/');
	}else{
		callback(null,ctx);
	}
}
module.exports = {account:new BasicModule};