const streamsController = require('../Controllers/Streams.controller');

// const ServiceValidator = require('../Validators/Services.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.get(
		'/api/v1/stream/get-stream-token',
		streamsController.getToken,
	);

	app.post(
		'/api/v1/stream/create-stream-token',
		streamsController.createStreamToken,
	);
};
