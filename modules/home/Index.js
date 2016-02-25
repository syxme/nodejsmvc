var async = require("async");
var header = function(){
   var ctx = {
   		title:"FUCK FUCK"
   }
   
}

header.prototype.render = function(req,callback){
	ctx = {
		title:"TUTLE"
	}

	async.auto({
		index:function(cb,results){ models.User.find({}).exec(cb)}
	},function(err,results){
		ctx.header = results.index;
		callback(err,ctx);
	});
}
module.exports.header = new header;