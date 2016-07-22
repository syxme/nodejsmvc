var _ = require('lodash');

var hasAccess = function(funcName, user, accessLevels) {
  if (_.indexOf(accessLevels.all, funcName) >= 0) {
    return true;
  } else if (_.indexOf(accessLevels.user, funcName) >= 0) {
    return typeof user !== 'undefined';
  } else if (_.indexOf(accessLevels.admin, funcName) >= 0 && typeof user !== 'undefined') {
    return (user.access === 'admin') || (user.access === 'root');
  } else {
    return false;
  }
};

module.exports = function(schema, options) {
  schema.statics.processRequest = function(req, res) {
    var args, func, method, segments, _ref;
    method = req.method;
    console.log(req.body.namex);
    var name = req.body.namex;
    segments = _.without(req.path.split('/'), "");
    func = (_ref = segments[2]) != null ? _ref : false;

    if (!(func || typeof this.access !== 'object')) {
      res.send("unknown method", 404);
    } else {
      if (req.session.user){
        req.user = req.session.user;
      }
      if (hasAccess(func, req.user, this.access)) {
        if (segments.length > 4) {
          args = segments.slice(4);
          args.unshift(req, res);
        } else {
          args = [req, res];
        }
        this[func].apply(this, args);
      } else {
        res.send("no access", 401);
      }
    }
  };
};