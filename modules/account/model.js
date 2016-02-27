var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

Users = new Schema({
	login	:String,
	email	:String,
	name	:String,
	password:String,
	status	:String,
	type	:String,
	dateup	:Date,
	timelast:Date
});

Users.statics.access = {
  all: [],
  user: [],
  admin: ['signup', 'auth', 'edit', 'remove']
}

Users.statics.signup = function(req,res){
	var data = req.body;
	var error = {}; error.info = [];
	
	if (!data.name||data.name.length<3){
		error.name = true;
		error.info.push('Слишком короткое имя.');
	}
	if (!data.email||data.email.length<5){
		error.email = true;
		error.info.push('Не верный email.');

	}
	if (!data.login||data.login.length<3){
		error.login = true;
		error.info.push('Слишком короткий логин.');

	}
	if (!data.password||data.password.length<6){
		error.password = true
		error.info.push('Слишком короткий пароль.');
	}
	if (error.info.length>0){
		req.hbscontex = {error:error,data:data};

		Engine.controllers.account.execute(req,res);
	}else{
		console.log(res);
		res.send(data);
	}
};

Users.statics.auth = function(req,res){
	res.send(req.body);
};

Users.statics.edit = function(req,res){
	res.send('delete');
};

Users.statics.remove = function(req,res){
	res.send('updateLink');
};
    
module.exports = models = {account: mongoose.model("Users",Users)};