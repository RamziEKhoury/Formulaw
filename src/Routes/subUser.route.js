const subUserController = require('../Controllers/subUser.controller');

const subUserValidator = require('../Validators/subUser.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/subUser/add-subUser',
		[subUserValidator.addsubUserValidator],
		subUserController.addSubUser,
	);

	app.post(
		'/api/v1/subUser/update-subUser',
		 [subUserValidator.UpdatesubUserValidator],
		subUserController.updateSubUser,
	);

	app.get(
		'/api/v1/subUser/get-subUser/:userId',
		subUserController.getSubUser
        );
	
	app.get(
			'/api/v1/subUser/get-AllsubUsers/:limit',
			subUserController.getAllSubUsers
            );

};
