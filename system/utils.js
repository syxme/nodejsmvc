var fs = require('fs');
var _ = require("lodash");
var Handlebars = require("handlebars");

var walk = function(dir, done) { 
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};


var view = function (name) {
  return Handlebars.compile(Engine.view[name]);
}


var get_tpl_seg = function(tpl){
  var mach = /(.*)\/(.*)\/(.*).hbs/;
  var resp = tpl.match(mach);
  return (resp)?resp:false;
}


var merge = function (data) {
  var main = (_.pick(data, 'context')).context;
  var sub = _.omit(data, 'context');
  _.extend(main, sub);
  return main;
}

var segments = function(req){
  return {
    segments:_.without(req.path.split("/"), ""),
    params:req.params
  }
}

var fname = function(x){
  return x.substring(x.lastIndexOf('/')+1,x.length);
}

var hbsName = function(x){
  var t = x.substring(x.indexOf('/')+1,x.length);
  t = t.substring(t.length-4,0);
  return t.replace('/',"_");
}

var frs = function(x){
  var name = x.substring(x.lastIndexOf('/')+1,x.length);
  return name.substring(name.lastIndexOf(".")+1,name.length);  
}
var Key = function (e){return Object.keys(e)};

module.exports = lead = {
  segments:segments,
  get_tpl_seg:get_tpl_seg,
  hbsName:hbsName,
  merge:merge,
  walk:walk,
  fn:fname,
  frs:frs,
  view:view
};
