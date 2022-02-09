const db = require('../models');
const apiResponses = require('../Components/apiresponse');
const {WorkflowAppointment} = require('../enum');
const Notifications = require('../Config/Notifications');
const saveSubscriptionScheduleCall = require('../Components/ScheduleAppointment');
const moment = require('moment');
const SubscriptionPayment = db.subscriptionPayment;
const User = db.user;
const Subscription = db.subscription;
const Request = db.request;
const UserSubscription = db.userSubscription;
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

async function leadFormValues(userId) {
	const userInfo = await User.findOne({where: {id: userId}});
	return {
		'firstName': userInfo.firstname,
		'lastName': userInfo.lastname,
		'email': userInfo.email,
		'jurisdictionId': ['9d06b7fa-5023-43a3-b50b-035694a427ec'],
		'jurisdictionName': ['England'],
		'languageId': ['009e168c-d142-446d-8e07-9a785dbc575e'],
		'languageName': ['Turkish'],
		'legalFieldId': 'aed0ff47-8529-411e-843c-935fcc0dfaf6',
		'legalFieldName': 'Real Estate',
		'serviceSubcategoryId': ['c1ad14e4-d73d-417d-9a90-621bb0c1b999'],
		'serviceSubcategoryName': ['Real Estate Financing, Mortgaging-Review, Advise'],
		'budgetMin': 0,
		'budgetMax': 0,
		'rating': 'good',
		'type': 'subscription',
		'experience': 'good',
		'getstarted': 'Free call',
		'industryId': '37d18a11-1cc3-478d-b8b8-fb23b3af6b88',
		'industryTitle': 'Education',
		'userId': userId,
		'isActive': 1,
	};
}

function formValues(subscription, userId) {
	const now = new Date();
	const endDateMonthly = new Date(now.setDate(now.getDate() + 30));
	const endDateYearly = new Date(now.setDate(now.getDate() + 365));
	if (subscription.durationType === 'Monthly') {
		return {
			userId: userId,
			subscriptionId: subscription?.id,
			durationType: subscription.durationType,
			subscriptionPlan: subscription.subscriptionType,
			startingDate: new Date(),
			endDate: endDateMonthly,
			numberOfMeeting: subscription.numberOfMeeting,
			ipAudit: subscription.ipAudit,
			meetingPlan: subscription.meetingPlan,
			contractTemplates: subscription.contractTemplates,
			contract_templates: subscription.contract_templates,
			discount: subscription.discount,
		};
	}
	return {
		userId,
		subscriptionId: subscription?.id,
		durationType: subscription.durationType,
		subscriptionPlan: subscription.subscriptionType,
		startingDate: new Date(),
		endDate: endDateYearly,
		numberOfMeeting: subscription.numberOfMeeting,
		ipAudit: subscription.ipAudit,
		meetingPlan: subscription.meetingPlan,
		contractTemplates: subscription.contractTemplates,
		contract_templates: subscription.contract_templates,
		discount: subscription.discount,
	};
}

async function createUserSubscription(subscription, userId) {
	const formvalues = formValues(subscription, userId);
	await UserSubscription.create({
		userId: formvalues.userId,
		subscriptionId: formvalues.subscriptionId,
		durationType: formvalues.durationType,
		subscriptionPlan: formvalues.subscriptionPlan,
		checkSubscription: formvalues.checkSubscription,
		startingDate: moment(formvalues.startingDate).format(),
		endDate: moment(formvalues.endDate).format(),
		numberOfMeeting: formvalues.numberOfMeeting,
		ipAudit: formvalues.ipAudit,
		meetingPlan: formvalues.meetingPlan,
		contractTemplates: formvalues.contractTemplates,
		contract_templates: formvalues.contract_templates,
		discount: formvalues.discount,
	});
	await createLead(subscription, userId);
}

async function createLead(subscription, userId) {
	const values = await leadFormValues(userId);
	const lead = await Request.create(values).then(async (request) => {
		const device = await User.findOne({where: {id: userId}});
		const notiData = {
			title: request.getstarted,
			message: 'Your free call has been scheduled and the amount have successfully paid for next subscription.',
			senderName: device.firstname + ' ' + device.lastname,
			senderId: userId,
			senderType: 'LEAD',
			receiverid: userId,
			notificationType: WorkflowAppointment.CREAT_LEAD,
			target: userId,
		};
		await Notifications.notificationCreate(notiData);
		if (!!device.deviceToken) {
			await Notifications.notification(device.deviceToken,
				'Your free call has been scheduled and the amount have successfully paid for next subscription.');
		}
		await saveSubscriptionScheduleCall(request, subscription, userId);
	});
}

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
	const event = req.body;
	console.log('event-------------------------------<><><><><><><><>', event.data);
	try {
		if (event.type === 'customer.subscription.updated' && event.data.object.status === 'active') {
			const subscriptionStripeId = event.data.object.id;
			console.log('subscriptionStripeId-------------------------------<><><><><><><><>', subscriptionStripeId);
			// eslint-disable-next-line max-len
			const fetchSubscriptionPayment = await SubscriptionPayment.findOne({where: {subscriptionStripeId: subscriptionStripeId}});
			console.log('fetchSubscriptionPayment-------------------------------<><><><><><><><>', fetchSubscriptionPayment);
			if (!!fetchSubscriptionPayment) {
				const subscriptionDetails = await Subscription.findOne({where: {id: fetchSubscriptionPayment.subscriptionId}});
				await createUserSubscription(subscriptionDetails, fetchSubscriptionPayment.userId);
			}
		}
	} catch (err) {
		res.status(400).send(`Webhook Error: ${err.message}`);
		return;
	}

	// Handle the event
	console.log(`Unhandled event type ${event.type}`);

	// Return a 200 response to acknowledge receipt of the event
	res.status(200).send(`Hello calling success`);
});
