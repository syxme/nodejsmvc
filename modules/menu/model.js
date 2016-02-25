var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

Menu = new Schema({
	name	:String,
	order	:{type: Number, default: 0},
	children:[{type: ObjectId, ref: 'Menu'}],
  	parent	:{type: ObjectId, ref: 'Menu'},  
	link	:{type: String, default: '/' }
});

Menu.statics.access = {
  all: [],
  user: [],
  admin: ['create', 'changeName', 'delete', 'updateLink']
}

Menu.statics.create = function(req,res){
	res.send('create');
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
    
module.exports = models = {menu: mongoose.model("Menu", Menu)};