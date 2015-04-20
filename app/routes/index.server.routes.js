module.exports = function(app) {
    var home = require('../controllers/index.server.controller');
    app.get('/home', home.render);
};