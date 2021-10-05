const requestControllers = require('../Controllers/requests.controller');

const requestValidator = require('../Validators/Request.validator');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/request/create-request',
		[requestValidator.createRequestValidator],
		requestControllers.createRequest,
	);

	app.post(
		'/api/v1/request/update-request',
		[requestValidator.updateRequestValidator],
		requestControllers.requestUpdate,
	);

	app.get(
		'/api/v1/request/get-request/:limit',
		requestControllers.getRequests,
	);

	app.get('/api/v1/request/get-request/:id', requestControllers.getRequest);

	app.delete(
		'/api/v1/request/delete-request/:id',
		requestControllers.deleteLawRequest,
	);
};
