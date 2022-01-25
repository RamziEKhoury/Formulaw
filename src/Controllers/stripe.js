const db = require('../models');
const apiResponses = require('../Components/apiresponse');
const SubscriptionPayment = db.subscriptionPayment;
const User = db.user;
const Subscription = db.subscription;
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

module.exports.createCharge = (async (req, res) => {
	try {
		let customerIn = null;
		stripe.customers.create({
			email: req.body.email,
			source: req.body.id,
			name: req.body.card.name,
			address: {
				line1: req.body.card.address_line1,
				postal_code: req.body.card.address_zip,
				city: req.body.card.address_city,
				state: req.body.card.address_state,
				country: req.body.card.address_country,
			},
		})
			.then((customer) => {
				customerIn = customer;
				return stripe.charges.create({
					amount: parseInt(req.body.appointment.query.cost, 10) * 100, // Charing Rs 25
					description: req.body.appointment.query.getstarted,
					currency: 'AED',
					customer: customer.id,
				});
			})
			.then((charge) => {
				const data = {
					customerIn,
					charge,
				};
				return apiResponses.successResponseWithData(res, 'Success', data);
			})
			.catch( (e) => {
				return apiResponses.errorResponse(res, e.raw.message);
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
});


module.exports.SubscriptionMonthly = (async (req, res) => {
	try {
		console.log(req.body);
		let customerIn = null;
		let priceIn = null;
		await stripe.customers.create({
			email: req.body.email,
			source: req.body.id,
		}).then(async (customer) => {
			customerIn = customer;
			await stripe.products.create({
				name: req.body.subscriptionName,
			}).then(async (product) => {
				await stripe.prices.create({
					product: product.id,
					unit_amount: (parseInt(req.body.amount, 10) * 100),
					currency: req.body.currencyValue,
					recurring: {
						interval: req.body.interval, // day and month
					},
				}).then(async (price) => {
					priceIn = price;
					await stripe.subscriptions.create({
						customer: customerIn.id,
						items: [
							{price: priceIn.id},
						],
					}).then(async (subscription) => {
						return apiResponses.successResponseWithData(res, ' Successfully created.', subscription);
					}).catch((error) => {
						return apiResponses.errorResponse(res, error);
					});
				}).catch((error) => {
					return apiResponses.errorResponse(res, error);
				});
			}).catch((error) => {
				return apiResponses.errorResponse(res, error);
			});
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
});


module.exports.cancelSubscription = (async (req, res) => {
	try {
		const subscriptionData = await SubscriptionPayment.findOne({
			where: {
				subscriptionStripeId: req.body.id,
			},
		});
		console.log('subscription-->', subscriptionData);
		if (!subscriptionData) {
			return apiResponses.notFoundResponse(res, 'Subscription Not exist', subscriptionData);
		} else {
			await stripe.subscriptions.del(
				subscriptionData.subscriptionStripeId,
			).then(async (subscription) => {
				await SubscriptionPayment.update(
					{
						status: 'cancelled',
					},
					{where: {id: subscriptionData.id}},
				);
				return apiResponses.successResponseWithData(res, ' Successfully created.', subscription);
			}).catch((error) => {
				return apiResponses.errorResponse(res, error);
			});
		}
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
});

module.exports.getOneSubscription = (async (req, res) => {
	try {
		console.log(req.body);
		await stripe.subscriptions.retrieve(
			req.body.subscriptionId,
		).then(async (subscription) => {
			return apiResponses.successResponseWithData(res, ' Successfully created.', subscription);
		}).catch((error) => {
			return apiResponses.errorResponse(res, error);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
});

module.exports.getSubscriptions = (async (req, res) => {
	try {
		SubscriptionPayment.findAll({
			include: [
				{
					model: User,
					required: false,
				},
				{
					model: Subscription,
					required: false,
				},
			],
		})
			.then(async (subscriptions) => {
				subscriptions = await Promise.all(subscriptions.map(async (p)=> {
					const result = await stripe.subscriptions.retrieve(p.subscriptionStripeId);
					return p.data = {
						stripePayment: result,
						subscription: p.subscription,
						user: p.user,
					};
				}));
				return apiResponses.successResponseWithData(res, ' Success.', subscriptions);
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
});

module.exports.getOneUserSubscriptions = (async (req, res) => {
	try {
		SubscriptionPayment.findAll({
			where: {userId: req.params.userId},
			include: [
				{
					model: User,
					required: false,
				},
				{
					model: Subscription,
					required: false,
				},
			],
			order: [['createdAt', 'DESC']],
		})
			.then(async (subscriptions) => {
				subscriptions = await Promise.all(subscriptions.map(async (p)=> {
					const result = await stripe.subscriptions.retrieve(p.subscriptionStripeId);
					return p.data = {
						stripePayment: result,
						subscription: p.subscription,
						user: p.user,
					};
				}));
				return apiResponses.successResponseWithData(res, ' Success.', subscriptions);
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
});


module.exports.webHooks = (async (req, res) => {
	console.log('Calling hooks-------------------------------<><><><><><><><>', req);
	const sig = req.headers['stripe-signature'];
	const endpointSecret = 'whsec_hcLpOiphBaV5nKETL2d4WUZV0pze8GY0';
	let event;

	console.log('Calling sig-------------------------------<><><><><><><><>', sig);
	try {
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
		console.log('event----->>>>>>>', event);
	} catch (err) {
		res.status(400).send(`Webhook Error: ${err.message}`);
		return;
	}

	// Handle the event
	console.log(`Unhandled event type ${event.type}`);

	// Return a 200 response to acknowledge receipt of the event
	res.status(200).send(`Hello calling success`);
});
