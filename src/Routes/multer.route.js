const multerController = require('../Components/multerFileUpload');
module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});


	app.post( '/api/uploads', multerController.fileUpload);
};

