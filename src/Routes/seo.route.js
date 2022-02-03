const seoController = require('../Controllers/seo.controller');

const SeoValidator = require('../Validators/seo.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/seo/add-seo',
		[SeoValidator.addSeoValidator],
		seoController.addSeo,
	);

	app.post(
		'/api/v1/seo/update-seo',
		[SeoValidator.updateSeoValidator],
		seoController.updateSeo,
	);

	app.get(
		'/api/v1/seo/get-seos/:limit',
		seoController.getSeos);

	app.get(
		'/api/v1/seo/get-seo/:id',
		seoController.getSeo);

    app.get(
        '/api/v1/seo/get-seobypagetitle/:pageTitle',
        seoController.getSeoByPageTitle);

	app.delete(
		'/api/v1/seo/delete-seo/:id',
		seoController.deleteSeo);
};
