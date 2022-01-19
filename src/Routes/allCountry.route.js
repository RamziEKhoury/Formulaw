const allCountryController = require('../Controllers/allCountry.controller');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/allcountry/add-allcountry',
		allCountryController.addallCountry
	);


	app.get(
		'/api/v1/allcountry/get-allcountries/:limit',
		allCountryController.getAllCountries);

	// app.get(
	// 	'/api/v1/country/get-country/:id',
	// 	countryController.getCountry);

	// app.delete(
	// 	'/api/v1/country/delete-country/:id',
	// 	countryController.deleteCountry);
};
