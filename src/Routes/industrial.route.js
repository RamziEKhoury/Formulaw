const industrialController = require('../Controllers/industrial.controller');

const IndustrialValidator = require('../Validators/Industrial.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/industrial/add-industrial',
		[IndustrialValidator.addIndustrialValidator],
		industrialController.addIndustrial,
	);

	app.post(
		'/api/v1/industrial/update-industrial',
		[IndustrialValidator.updateIndustrialValidator],
		industrialController.industrialUpdate,
	);

	app.get(
		'/api/v1/industrial/get-industrials/:limit',
		industrialController.getIndustrials);

	app.get(
		'/api/v1/industrial/get-industrial/:id',
		industrialController.getIndustrial);

	app.delete(
		'/api/v1/industrial/delete-industrial/:id',
		industrialController.deleteIndustrial);
	
	app.post(
		'/api/v1/industrial/sortnumber-check',
		industrialController.sortnumberVarify);
};
