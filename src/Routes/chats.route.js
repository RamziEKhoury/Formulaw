const chatControllers = require('../Controllers/chats.controllers');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/chat/all-messages',
		chatControllers.getChatWithMessages,
	);
};
