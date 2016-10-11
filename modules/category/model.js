var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

category = new Schema({
	name	:String,
	order	:{type: Number, default: 0},
	parent	:{type: ObjectId, ref: 'category'},   
	link	:{type: String, default: '/' }
});

category.statics.access = {
	all: ['create_category',"remove_category"],
	user: [],
	admin: ['create_category', 'changeName', 'delete', 'updateLink']
}

function makeTree(arr,item,path){
	if(!item){
		var cat = [],tmp;
		for (i in arr) {
			if (typeof arr[i].parent =="undefined"){
				tmp = arr[i];
				tmp.path = arr[i].name;
				tmp.cat = arr.reduce(function(result,subItem){
					if(tmp._id === subItem.parent) result.push(makeTree(arr,subItem,tmp.name));
					return result;
				},[]);
				cat.push(tmp);
			}
		}
		return cat;
	}else{
		item.path = path + " ➤ "+ item.name ;
		item.cat = arr.reduce(function(result,subItem){
			if(item._id === subItem.parent)result.push(makeTree(arr,subItem,item.path));
			return result;
		},[]);
		return item;
	}	
}

category.statics.getCategory = function(cb){
	this.find({},function(err,items){
		if (items){
			var data = {
				list:items,
			};
			data.cat = makeTree(JSON.parse(JSON.stringify(items)));
			cb(err,data);
		}else{
			cb(err,{list:{},cat:{}});
		}	
	});

};


category.statics.create_category = function(req,res){
	var post =req.body;
	if (!post.parent){
		post.parent = ObjectId("root");
	}

	var data = {
		name: post.name,
		parent:post.parent,
		link:post.link
	};
	this.create(data,function(err,response){
		res.send(response);
	});
};

category.statics.changeName = function(req,res){
	res.send('changeName');
};

var removeChilds = function(id){
	models.category.remove({_id:id},function(err,e){
		models.category.findOne({parent:id},function(err,item){
			if (item){
				removeChilds(item._id);
			}else{
				return true;
			}
		});
	});
};

category.statics.remove_category = function(req,res){
	var id = req.body.id;
	removeChilds(id);
	res.send('delete');
};

category.statics.updateLink = function(req,res){
	res.send('updateLink');
};

module.exports = models ={category: mongoose.model("category", category)};