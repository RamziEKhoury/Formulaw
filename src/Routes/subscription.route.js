const subscriptionController = require('../Controllers/subscription.controller');

const SubscriptionValidator = require('../Validators/subscription.validator');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/subscription/add-subscription',
		[SubscriptionValidator.addSubscriptionValidator],
		subscriptionController.addSubscription,
	);

	app.post(
		'/api/v1/subscription/add-subscriptionPayment',
		subscriptionController.addSubscriptionPayment);

	app.post(
		'/api/v1/subscription/update-subscription',
		// [SubscriptionValidator.updateSubscriptionValidator],
		subscriptionController.updateSubscription,
	);
	app.get('/api/v1/subscription/get-subscriptionstype/:durationType', subscriptionController.getSubscriptionsType);
	app.get('/api/v1/subscription/get-subscriptions/:limit', subscriptionController.getSubscriptions);

	app.get('/api/v1/subscription/get-subscription/:id', subscriptionController.getSubscription);
	app.get('/api/v1/subscription/get-allsubscriptionpayment', subscriptionController.getAllSubscriptionPayment);
};
