var User = require('mongoose').model('User')

exports.render = function (req, res) {
    res.render('index', {
        title: 'Colonize',
        user: req.user ? req.user.username : ''
    });
};

exports.saveGame = function (req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body,
        function (err, user) {
            if (err) {
                return next(err);
            } else {
                res.json(user);
                next();
            }
        });
}

exports.loadGame = function (req, res, next) {
    User.findOne(req.user.id,
        function (err, user) {
            if (err) {
                return next(err);
            } else {
                req.user = user;
            }
        });
}