var User = require('mongoose').model('User'),
    util = require('util'),
    passport = require('passport');

exports.create = function(req, res, next) {
    var user = new User(req.body);
//    console.log(req.body);
    user.save(function(err) {
        if(err){
            return next(err);
        }
        else{
            res.json(user);
        }
    });
};

exports.list = function(req, res, next) {
    User.find({}, function(err, users) {
        if(err) {
            return next(err);
        }
        else{
            util.inspect(res.json(users));
        }
    });
};

exports.read = function(req, res) {
	util.inspect(res.json(req.user), {showHidden: true});
};

exports.userByID = function(req, res, next, id) {
	User.findOne({
			_id: id
		}, 
		function(err, user) {
			if (err) {
				return next(err);
			}
			else {
				req.user = user;
				next();
			}
		}
	);
};

exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body,
                           function(err, user) {
        if(err) {
            return next(err);
        }
        else{
            res.json(user);
        }
    });
};

exports.delete = function(req, res, next) {
    req.user.remove(function(err) {
        if(err) {
            return next(err);
        }
        else{
            res.json(req.user);
        }
    });
};


var getErrorMessage = function(err) {
    var message = '';
    if(err.code) {
        switch(err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Something went wrong...';
        }
    }
    else{
        for(var errName in err.errors) {
            if(err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }
    
    return message;
};
            
exports.renderLogin = function(req, res, next) {
    if(!req.user) {
        res.render('login', {
            title: 'Login', 
            messages: req.flash('error') || req.flash('info')
        });
    }
    else{
        return res.redirect('/home');
    }
};

exports.renderRegister = function(req, res, next) {
    if(!req.user) {
        res.render('register', {
            title: 'Register', 
            messages: req.flash('error')
        });
    }
    else{
        return res.redirect('/home');
    }
};

exports.register = function(req, res, next) {
    if(!req.user) {
        var user = new User(req.body);
        var message = null;
        user.provider = 'local';
        user.save(function(err) {
            if(err) {
                var message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/register');
            }
            
            req.login(user, function(err) {
                if(err) {
                    return next(err);
                }
                
                return res.redirect('/home');
            });
        });
    }
    else{
        return res.redirect('/');
    }
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};