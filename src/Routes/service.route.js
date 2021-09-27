const serviceController = require('../Controllers/services.controller');

const ServiceValidator = require('../Validators/Services.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/service/add-service',
		[ServiceValidator.addServiceValidator],
		serviceController.addService,
	);

	app.post(
		'/api/v1/service/update-country',
		[ServiceValidator.updateServiceValidator],
		serviceController.serviceUpdate,
	);

	app.get(
		'/api/v1/service/get-countries/:page/:offset',
		serviceController.getServices);

	app.get(
		'/api/v1/service/get-service/:id',
		serviceController.getService);
};
