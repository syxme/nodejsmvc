var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

Account = new Schema({
	login	:String,
	email	:String,
	name	:String,
	password:String,
	status	:String,
	type	:String,
	dateup	:Date,
	timelast:Date,
	access:{
		type:String,
		default:"true"
	}
});

Account.statics.access = {
  all: ['signup','auth'],
  user: ['edit',"logout"],
  admin: ['edit', 'remove']
}
Account.statics.logout = function(req,res){
	if (req.session.user){
		delete req.session.user;
		res.redirect('/');
	}	
}
Account.statics.signup = function(req,res){
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
		req.session.error = {error:error,data:data};
		res.redirect('back');
	}else{
		this.findOne({$or:[{login:data.login},{email:data.email}]},function(err,user){
			if (!err){
				if (user){
					error.email = error.login = true;			
					error.info.push('Пользователь или email уже существует');
					req.session.error = {error:error,data:data};
					res.redirect('back');
				}else{
					var acc = new Engine.models.account(data);
					acc.save(function(err){
						if (!err){
							console.log(user);
							req.session.info = {info:"Успешная регистрация"};
							res.redirect('/signin/');
						}else{
							res.send(config.errors.dbf);
						}
					});
				}
			}else{
				res.send(config.errors.dbf);
			}
		});
	}
};

Account.statics.auth = function(req,res){
	var data = req.body;
	var error = {}; error.info = [];
	var nologin = false;

	if (!data.login||data.login.length<3){
		error.login = true;
		error.info.push('Слишком короткий логин.');
	}

	if (!data.password||data.password.length<6){
		error.password = true
		error.info.push('Слишком короткий пароль.');
	}

	if (error.info.length>0){
		req.session.error = {error:error,data:data};
		res.redirect('back');
	}else{
		this.findOne({$or:[{login:data.login},{email:data.login}]},function(err,user){
			if (!err){
				if (user){
					if (user.password == data.password){
						req.session.user = user;
						res.redirect('/');
					}else{
						nologin = true;
					}
				}else{
					nologin = true;
				}
				if (nologin){
					error.login = error.login = true;
					error.info.push('Неверный пользователь или пароль!!!');
					req.session.error = {error:error,data:data};
					res.redirect('back');
				}
			}else{
				res.send(config.errors.dbf);
			}
		});
	}


};

Account.statics.edit = function(req,res){
	res.send('delete');
};

Account.statics.remove = function(req,res){
	res.send('updateLink');
};
    
module.exports = models = {account: mongoose.model("account",Account)};