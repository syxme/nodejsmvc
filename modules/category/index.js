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
	var ctx = {
		title:"Категории"
	};
	if (req.session.user){
		ctx.user = req.session.user;
	}

	// async.auto({
	// 	cat:function(cb,results){ models.category.getProducts(cb)}
	// },function(err,results){
	// 	ctx = _.assign(ctx,results.cat);
	// 	ctx = _.assign(ctx,results.list);
	// 	ctx = lead.view('category_edit')(ctx);
	// 	callback(err,ctx);
	// });
	ctx.name = req.params.name;
	ctx.title = (req.params.name)?req.params.name:ctx.title;
	ctx.module  = lead.view('home_megan')(ctx);
	callback(null,ctx);
}
module.exports = {category:new BasicModule};