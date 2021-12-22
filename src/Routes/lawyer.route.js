const lawyerController = require('../Controllers/lawyers.controller');

const LawyerValidator = require('../Validators/Lawyer.validator');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/lawyer/add-lawyer',
		[LawyerValidator.addLawyerValidator],
		lawyerController.addLawyer,
	);

	app.post(
		'/api/v1/lawyer/update-lawyer',
		[LawyerValidator.updateLawyerValidator],
		lawyerController.lawyerUpdate,
	);

	app.get('/api/v1/lawyer/get-lawyers/:lawFirmId', lawyerController.getLawyers);

	app.get('/api/v1/lawyer/get-lawyer/:id', lawyerController.getLawyer);

	app.get('/api/v1/lawyer/get-lawyer-statuses/:lawFirmId', lawyerController.getLawyerStatuses);

	app.get('/api/v1/lawyer/get-lawyer-cases/:lawFirmId', lawyerController.getLawyerTotalCases);

	app.delete('/api/v1/lawyer/delete-lawyer/:id', lawyerController.deleteLawyer);
};
