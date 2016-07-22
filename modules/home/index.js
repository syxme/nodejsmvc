var async = require("async");


var BasicModule = function(){}
BasicModule.prototype.info = {
	title:"Модуль Домашняя хрен",
	link:"Траратота",
	url:"home",
	priority:2

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
		title:"MVC Engine"
	};


	ctx = lead.view("home_megan")(ctx);

	callback(null,ctx);

}

module.exports = {home:new BasicModule};