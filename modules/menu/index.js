var async = require("async");
var BasicModule = function(){
   var ctx = {};
}
BasicModule.prototype.admin = function(req,callback){
	ctx = {
		title:"Меню"
	};

}

BasicModule.prototype.render = function(req,callback){

	// async.auto({
	// 	users:function(cb,results){ models.User.find({}).exec(cb)}
	// },function(err,results){
	// 	ctx  = {
	// 		menu:results.users
	// 	}
	// 	ctx = Engine.view.menu_index(ctx);
	// 	callback(err,ctx);
	// });
	ctx = Engine.view.menu_index(ctx);
	callback(null,ctx);
}
module.exports = {menu:new BasicModule};