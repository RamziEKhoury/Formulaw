const lawFirmController = require('../Controllers/lawFirms.controller');

const LawFirmValidator = require('../Validators/lawFirm.validator');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/lawfirm/add-lawfirm',
		[LawFirmValidator.addLawFirmValidator],
		lawFirmController.addLawFirm,
	);

	app.post(
		'/api/v1/lawfirm/update-lawfirm',
		[LawFirmValidator.updateLawFirmValidator],
		lawFirmController.lawFirmUpdate,
	);
	app.post(
		'/api/v1/lawfirm/workflow/:lawFirmId/:workflow',
		[LawFirmValidator.updateLawFirmWorkflowStatusValidator],
		lawFirmController.lawFirmeWorkflowStatus,
	);

	app.get('/api/v1/lawfirm/get-lawfirms/:limit', lawFirmController.getLawFirms);

	app.get('/api/v1/lawfirm/get-lawfirm/:id', lawFirmController.getLawFirm);

	app.delete(
		'/api/v1/lawfirm/delete-lawfirm/:id',
		lawFirmController.deleteLawFirm,
	);

	app.get('/api/v1/lawfirm/get-lawfirmsdetails', lawFirmController.getlawFirmsDetails);
	app.get('/api/v1/lawfirm/get-lawfirmdetails/:lawFirmId', lawFirmController.getlawFirmDetails);
	app.get('/api/v1/lawfirm/get-filterlawfirmdetails', lawFirmController.getFilterlawFirmsDetails);
};
