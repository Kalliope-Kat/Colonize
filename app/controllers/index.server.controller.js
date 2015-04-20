exports.render = function(req, res) {
    res.render('index', {
    	title: 'Colonize',
        user: req.user ? req.user.username : ''
    });
};