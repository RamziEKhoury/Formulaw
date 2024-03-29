const usersController = require('../Controllers/users.controller');
const {checkDuplicateEmail} = require('../Middlewares/userVarified');
const UserAuth = require('../Validators/User.validator');
const {getUserCredentialsForCredentials} = require('../Controllers/linkedin.controller');


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
		'/api/v1/auth/user/update-user',
		UserAuth.updateValidator,
		usersController.userUpdate,
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

	app.get(
		'/api/v1/auth/user/get-user/:id',
		usersController.getUser,
	);

	app.post(
		'/api/v1/auth/user/update-deviceToken/:id',
		usersController.userDeviceTokenUpdate,
	);

	app.post(
		'/api/v1/auth/user/reset-password',
		usersController.userPasswordReset,
	);

	app.post(
		'/api/v1/auth/user/Updatenew-password/:token',
		usersController.updateNewPassword,
	);

	app.post(
		'/api/v1/auth/user/UpdatenewLawFirm-password',
		usersController.updateLawFirmPassword,
	);

	app.get(
		'/api/v1/auth/user/getLinkedinDetails',
		getUserCredentialsForCredentials,
	);
	app.post(
		'/api/v1/auth/user/lawyerlogin',
		UserAuth.lawyerLogInValidator,
		usersController.lawyerLogin,
	);
};
