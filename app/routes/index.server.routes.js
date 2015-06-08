module.exports = function(app) {
    var home = require('../controllers/index.server.controller');
    app.get('/home', home.render);
    app.route('/home').put(home.saveGame);
};