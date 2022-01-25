const userSubscrptionController = require('../Controllers/userSubscription.controller');

const UserSubscrptionValidator = require('../Validators/userSubscription.validator');
const {
	createCharge,
	SubscriptionMonthly,
	cancelSubscription,
	getOneSubscription,
	getSubscriptions,
	getOneUserSubscriptions, webHooks,
} = require('../Controllers/stripe');


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

	// Stripe
	app.post(
		'/api/v1/payment/create-charge',
		createCharge);

	app.post(
		'/api/v1/payment/create-subscription',
		SubscriptionMonthly);

	app.post(
		'/api/v1/payment/cancel-subscription',
		cancelSubscription);

	app.post(
		'/api/v1/payment/get-subscription',
		getOneSubscription);

	app.get(
		'/api/v1/payment/get-subscriptions',
		getSubscriptions);
	app.get(
		'/api/v1/payment/get-oneusersubscriptions/:userId',
		getOneUserSubscriptions);

	app.post(
		'/api/v1/payment/hooks',
		webHooks);
};