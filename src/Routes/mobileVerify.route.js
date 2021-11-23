const mobileVerifyController = require('../Controllers/mobileVerify.controller');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.get('/api/v1/verify/getcode', mobileVerifyController.getCode);
	app.get('/api/v1/verify/verifycode', mobileVerifyController.verifyCode);
};
