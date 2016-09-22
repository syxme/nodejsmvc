var async = require("async");


var BasicModule = function(){}
BasicModule.prototype.info = {
	title:"Модуль Домашняя хрен",
	link:"Траратота",
	url:"home",
	priority:3

};

BasicModule.prototype.admin = function(req,callback){
	var ctx = {
		title:"Домашняя хрень"
	};
	ctx = lead.view('home_megan')(ctx);
	callback(null,ctx);

}

BasicModule.prototype.render = function(req,res,callback){
	
	var ctx = {
		title:"home_megan"
	};


	ctx.module = lead.view("home_megan")(ctx);

	callback(null,ctx);

}

module.exports = {home:new BasicModule};