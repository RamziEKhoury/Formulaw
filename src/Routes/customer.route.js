const customerController = require('../Controllers/customer.controller');

// const CountryValidator = require('../Validators/Country.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/customer/add-customer',
		customerController.addCustomer,
	);

	app.get(
		'/api/v1/customer/get-customers/:limit',
		customerController.getCustomers);

	app.get(
		'/api/v1/customer/get-customer/:id',
		customerController.getCustomer);


};
