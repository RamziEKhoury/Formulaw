const chargeController = require('../Controllers/charge.controller');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/charge/add-charge',
		chargeController.addCharge);

	app.get(
		'/api/v1/charge/get-charges/:limit',
		chargeController.getCharges);

	app.get(
		'/api/v1/charge/get-charge/:id',
		chargeController.getCharge);
};
