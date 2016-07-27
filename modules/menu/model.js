var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

Menu = new Schema({
	name	:String,
	order	:{type: Number, default: 0},
	//children:[{type: ObjectId, ref: 'menu'}], //через них будем делать 
	parent	:{type: ObjectId, ref: 'Menu'},   
	link	:{type: String, default: '/' }
});

Menu.statics.access = {
	all: ['createMenu'],
	user: [],
	admin: ['createMenu', 'changeName', 'delete', 'updateLink']
}

function makeTree(arr,item){
	if(!item) item = arr[0];
		item.menu = arr.reduce(function(result,subItem){
			if(item._id === subItem.parent) result.push(makeTree(arr,subItem));
			return result;
		},[]);
		return item;
}

Menu.statics.getMenu = function(cb){
	
	this.find({},function(err,items){	
		var data = {
			list:items,
		};
		data.menu = makeTree(JSON.parse(JSON.stringify(items))).menu;
		cb(err,data);
	});
};


Menu.statics.createMenu = function(req,res){
	var post =req.body;
	var data = {
		name: post.namex,
		parent:post.parent,
		link:post.link
	};
	this.create(data,function(err,response){
		res.send(response);
	});
};

Menu.statics.changeName = function(req,res){
	res.send('changeName');
};

Menu.statics.delete = function(req,res){
	res.send('delete');
};

Menu.statics.updateLink = function(req,res){
	res.send('updateLink');
};

module.exports = models ={Menu: mongoose.model("menu", Menu)};