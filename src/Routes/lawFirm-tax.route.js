const lawFirmTaxController = require('../Controllers/lawFirm-taxes.controller');

const LawFirmTaxValidator = require('../Validators/LawFirm-taxes.validator');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/lawfirm/add-tax',
		[LawFirmTaxValidator.addLawFirmTaxValidator],
		lawFirmTaxController.addLawFirmTax,
	);

	app.post(
		'/api/v1/lawfirm/update-tax',
		[LawFirmTaxValidator.updateLawFirmTaxValidator],
		lawFirmTaxController.lawFirmTaxUpdate,
	);

	app.get('/api/v1/lawfirm/get-taxes/:lawFirmId', lawFirmTaxController.getLawFirmTaxes);

	app.get('/api/v1/lawfirm/get-tax/:id', lawFirmTaxController.getLawFirmTax);

	
};
