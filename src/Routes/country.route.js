const countryController = require('../Controllers/countries.controller');

const CountryValidator = require('../Validators/Country.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/country/add-country',
		[CountryValidator.addCountryValidator],
		countryController.addCountry,
	);

	app.post(
		'/api/v1/country/update-country',
		[CountryValidator.updateCountryValidator],
		countryController.countryUpdate,
	);

	app.get(
		'/api/v1/country/get-countries/:limit',
		countryController.getCountries);

	app.get(
		'/api/v1/country/get-country/:id',
		countryController.getCountry);

	app.delete(
		'/api/v1/country/delete-country/:id',
		countryController.deleteCountry);
};
