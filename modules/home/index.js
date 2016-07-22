var async = require("async");


var BasicModule = function(){}
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
	ctx = lead.view('menu_edit')(ctx);
	callback(null,ctx);

}

BasicModule.prototype.render = function(req,res,callback){
	
	var ctx = {
		title:"MVC Engine"
	};


	ctx = lead.view("home_megan")(ctx);

	callback(null,ctx);

}

module.exports = {home:new BasicModule};