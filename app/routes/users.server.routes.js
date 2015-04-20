var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport'),
    session = require('express-session'),
    flash = require('connect-flash');


module.exports = function(app) {
    app.route('/').get(users.renderLogin).post(passport.authenticate('local', {
        successRedirect: '/home',
        failureRediect: '/',
        failureFlash: true
    }));
    app.route('/users').post(users.create).get(users.list);
    app.route('/users/:userId').get(users.read).put(users.update).delete(users.delete);
    app.param('userId', users.userByID);
    
    app.route('/register').get(users.renderRegister).post(users.register);
	app.get('/logout', users.logout);
}