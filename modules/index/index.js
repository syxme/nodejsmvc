var async = require("async");
var BasicModule = function(){
   var ctx = {};
}

BasicModule.prototype.render = function(req,callback){
	var ctx = {
		title:"TUTLE",
		text:"HEADER"
	}

	callback(null,ctx);
}

module.exports  = {index:new BasicModule};