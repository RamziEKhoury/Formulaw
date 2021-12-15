const messageControllers = require('../Controllers/message.controller');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.get(
		'/api/v1/message/all-messageswithfile/:userId',
		messageControllers.getMessagesWithFile
	);
};
