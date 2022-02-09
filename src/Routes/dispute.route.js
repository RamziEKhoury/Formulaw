const disputeController = require('../Controllers/dispute.controller');
const DisputeValidator = require('../Validators/dispute.validator');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/dispute/add-dispute',
		[DisputeValidator.addDispute],
		disputeController.addDispute,
	);
	app.post(
		'/api/v1/dispute/status/:id/:status',
		[DisputeValidator.updateDisputeStatusValidator],
		disputeController.DisputeStatus,
	);
	app.get(
		'/api/v1/dispute/get-disputes',
		disputeController.getDisputes,
	);
	app.get(
		'/api/v1/dispute/get-dispute/:id',
		disputeController.getDispute,
	)

};
