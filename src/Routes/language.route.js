const languageController = require('../Controllers/languages.controller');

const LanguageValidators = require('../Validators/Language.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/language/add-language',
		[LanguageValidators.addLanguageValidator],
		languageController.addLanguage,
	);

	app.post(
		'/api/v1/language/update-language',
		[LanguageValidators.updateLanguageValidator],
		languageController.languageUpdate,
	);

	app.get(
		'/api/v1/language/get-languages/:limit',
		languageController.getLanguages);

	app.get(
		'/api/v1/language/get-language/:id',
		languageController.getLanguage);
};
