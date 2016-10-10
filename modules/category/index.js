var async = require("async");
var _ = require("lodash");


var BasicModule = function(){
	
}
BasicModule.prototype.info = {
	title:"Редактор категорий",
	link:"Категории",
	url:"category",
	priority:2

};

BasicModule.prototype.admin = function(req,callback){
	var ctx = {
		title:"Редактор категорий"
	};

	async.auto({
		cat:function(cb,results){ models.category.getCategory(cb)}
	},function(err,results){
		ctx = _.assign(ctx,results.cat);
		ctx = _.assign(ctx,results.list);
		ctx = lead.view('category_edit')(ctx);
		callback(err,ctx);
	});


}

BasicModule.prototype.render = function(req,res,callback){
	var ctx = {};
	if (req.session.user){
		ctx.user = req.session.user;
	}

	

	ctx = lead.view('menu_index')(ctx);
	callback(null,ctx);
}
module.exports = {category:new BasicModule};