const lawFirmIndustryController = require('../Controllers/lawFirm-industries.controller');

const LawFirmIndustryValidator = require('../Validators/LawFirm-industries.validator');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/lawfirm/add-industry',
		[LawFirmIndustryValidator.addLawFirmIndustryValidator],
		lawFirmIndustryController.addLawFirmIndustry,
	);

	app.post(
		'/api/v1/lawfirm/update-industry',
		[LawFirmIndustryValidator.updateLawFirmIndustryValidator],
		lawFirmIndustryController.lawFirmIndustryUpdate,
	);

	app.get('/api/v1/lawfirm/get-industries/:limit', lawFirmIndustryController.getLawFirmIndustries);

	app.get('/api/v1/lawfirm/get-industry/:id', lawFirmIndustryController.getLawFirmIndustry);

	// app.delete(
	// 	'/api/v1/lawfirm/delete-lawfirm/:id',
	// 	lawFirmIndustryController.deleteLawFirm,
	// );
};
