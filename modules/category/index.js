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
	console.log(req.segments);

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
	console.log(req.segments);
	if (req.segments[0]=="category"){
		ctx.title = req.segments[1];
	}
	async.auto({
		category:function(cb,results){ models.category.getCategory(cb,{link:req.segments[1]})}
	},function(err,results){
		ctx.module = lead.view('category_menu_category')(results.category.cat);
		callback(err,ctx);
	});

	// ctx.name = req.params.name;
	// ctx.title = (req.params.name)?req.params.name:ctx.title;
	// ctx.module  = lead.view('home_megan')(ctx);
	// callback(null,ctx);
}

// function redraw(arr){
// for 
// } 

BasicModule.prototype.render_menu = function(req,res,callback){
	var ctx = {};
	if (req.segments[0]=="category"){
		ctx.title = req.segments[1];
	}
	async.auto({
		category:function(cb,results){ models.category.getMenuCategory(cb,{item:req.segments[1]})}
	},function(err,results){
		ctx.cat = results.category.cat;
		//console.log(ctx);
		ctx = lead.view('category_menu_category')(ctx);
		callback(err,ctx);
	});

}

module.exports = {category:new BasicModule};