const userSubscrptionController = require('../Controllers/userSubscription.controller');

const UserSubscrptionValidator = require('../Validators/userSubscription.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/userSubscription/add-userSubscription',
		[UserSubscrptionValidator.addUserSubscriptionValidator],
		userSubscrptionController.addUserSubscription,
	);

	app.post(
		'/api/v1/userSubscription/update-userSubscription',
		[UserSubscrptionValidator.UpdateUserSubscriptionValidator],
		userSubscrptionController.updateUserSubscription,
	);

	app.get(
		'/api/v1/userSubscription/get-userSubscription/:userId',
		userSubscrptionController.getUserSubscription);

	app.get(
		'/api/v1/userSubscription/get-allUsersSubscription/:limit',
		userSubscrptionController.getAllUsersSubscription);

	app.get(
		'/api/v1/userSubscription/check-userSubscription/:userId',
		userSubscrptionController.checkSubscription);
};
