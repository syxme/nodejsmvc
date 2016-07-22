var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

Menu = new Schema({
	name	:String,
	order	:{type: Number, default: 0},
	//children:[{type: ObjectId, ref: 'Menu'}],
  	parent	:{type: ObjectId, ref: 'Menu'},  
	link	:{type: String, default: '/' }
});

Menu.statics.access = {
  all: ['create'],
  user: [],
  admin: ['create', 'changeName', 'delete', 'updateLink']
}


Menu.statics.getMenu = function(cb){
	this.find({},function(err,res){
		cb(err,res)
	});
};


Menu.statics.create = function(req,res){
	var post =req.body;
	var data = {};
	data.name = post.namex;
	data.parent = post.parent;
	data.link = post.link;

	console.log(data);


	this.create(data,function(err,res){
		res.send(true);
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
    
module.exports = models ={Menu: mongoose.model("Menu", Menu)};