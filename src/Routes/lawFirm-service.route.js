const lawFirmServiceController = require('../Controllers/lawFirm-services.controller');

const LawFirmServiceValidator = require('../Validators/lawFirm-service.validator');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/lawfirm/add-service',
		[LawFirmServiceValidator.addLawFirmServiceValidator],
		lawFirmServiceController.addLawFirmService,
	);

	app.post(
		'/api/v1/lawfirm/update-service',
		[LawFirmServiceValidator.updateLawFirmServiceValidator],
		lawFirmServiceController.lawFirmServiceUpdate,
	);

	app.get('/api/v1/lawfirm/get-services/:limit', lawFirmServiceController.getLawFirmServices);

	app.get('/api/v1/lawfirm/get-service/:id', lawFirmServiceController.getLawFirmService);

	
};
