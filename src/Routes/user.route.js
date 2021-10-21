const usersController = require('../Controllers/users.controller');
const {checkDuplicateEmail, validateEmail} = require('../Middlewares/userVarified');
const UserAuth = require('../Validators/User.validator');


module.exports= function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/auth/user/signup',
		[UserAuth.signUpValidator, checkDuplicateEmail],
		usersController.registration,
	);

	app.post(
		'/api/v1/auth/user/login',
		UserAuth.logInValidator,
		usersController.userLogin,
	);

	app.post(
		'/api/v1/auth/user/email-check',
		usersController.emailVarify,
	);

	app.get(
		'/api/v1/auth/user/users/:limit',
		usersController.users,
	);
};
