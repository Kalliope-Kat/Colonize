var User = require('mongoose').model('User')

exports.render = function (req, res) {
    res.render('index', {
        title: 'Colonize',
        user: req.user ? req.user.username : ''
    });
};

exports.saveGame = function (req, res) {
    User.findByIdAndUpdate(req.user.id, req.body,
        function (err, user) {
            if (err) {
                return next(err);
            } else {
                res.json(user);
            }
        });
}