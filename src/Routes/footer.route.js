const footerController = require('../Controllers/footer.controller');

const footerValidator = require('../Validators/footer.validator');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/footer/add-footer',
		footerController.addFooter,
	);
	app.get('/api/v1/footer/get-footers', 
        footerController.getFooters);
	app.get('/api/v1/footer/get-footer/:id',
        footerController.getFooter);
};
