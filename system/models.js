var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/nodejsmvc");
  //mongoose.connect("mongodb://admin:VWSsE7s7W_fS@"+process.env.OPENSHIFT_MONGODB_DB_HOST+":27017/syxme");

module.exports = {};
