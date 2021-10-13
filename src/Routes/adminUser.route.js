const userController = require('../Controllers/adminUsers.controller');
const {
	checkDuplicateUsernameOrEmail,
	validateUsername,
} = require('../Middlewares/adminUserVerified');
const UserAuth = require('../Validators/adminUser.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/auth/signup',
		[UserAuth.signUpValidator, checkDuplicateUsernameOrEmail],
		userController.registration,
	);

	app.post(
		'/api/v1/auth/login',
		[UserAuth.signInValidate, validateUsername],
		userController.userLogin,
	);

	app.get(
		'/api/v1/auth/admins',
		userController.admins,
	);

	app.delete(
		'/api/v1/auth/delete-user',
		userController.deleteUser,
	);
};
