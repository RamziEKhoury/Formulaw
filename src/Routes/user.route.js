const userController = require('../Controllers/users.controller');
const {
	checkDuplicateUsernameOrEmail,
	validateUsername,
} = require('../Middlewares/Verified');
const UserAuth = require('../Validators/User.validator');


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
};
