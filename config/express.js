var config = require('./config'),
    express = require('express'),
	bodyParser = require('body-parser');
    

module.exports = function() {
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.set('views', './app/views');
	app.set('view engine', 'jade');

	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
    
    app.use(require('stylus').middleware(__dirname +  '/public'));
	app.use(express.static('./public'));
    

	return app;
};