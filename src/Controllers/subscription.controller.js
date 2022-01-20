const db = require('../models');
const Subscription = db.subscription;
const SubscriptionPayment = db.subscriptionPayment;
const apiResponses = require('../Components/apiresponse');

module.exports.addSubscription = async (req, res) => {
	try {
		// #swagger.tags = ['Subscription']
		/*  #swagger.parameters['obj'] = {
			          in: 'body',
			          description: "Subscription details for add - en_name, ar_name,licenseNumber,countryId,countryTitle,langaugeId,langaugeTitle,experience,jurisdiction,expertise,rating,isActive",
			          schema: { $en_name: "", $ar_name: "" ,  $isActive: "", $licenseNumber: "" , $countryId: "" ,$countryTitle:"", $langaugeId: "",$langaugeTitle:"",$serviceId:"", $rating: "" , $experience:"",$numOfLawyer: "", $taxType:"",$tax:"", $expertise: "",$jurisdiction:""}
        } */
		Subscription.create({
			title: req.body.title,
			description: req.body.description,
			durationType: req.body.durationType,
			discountPercent: req.body.discountPercent,
			subscriptionType: req.body.subscriptionType,
			price: req.body.price,
			currency: req.body.currency,
			numberOfMeeting: req.body.numberOfMeeting,
			ipAudit: req.body.ipAudit,
			meetingPlan: req.body.meetingPlan,
			contractTemplates: req.body.contractTemplates,
			contract_templates: req.body.contract_templates,
			discount: req.body.discount,
			images: req.body.images,
			logo: req.body.logo,
			features: req.body.features,
			sortnumber: req.body.sortnumber,
		}).then((subscription) => {
			return apiResponses.successResponseWithData(
				res,
				'success!',
				subscription,
			);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.updateSubscription = async (req, res) => {
	try {
		// #swagger.tags = ['Subscription']
		/*  #swagger.parameters['obj'] = {
			          in: 'body',
			          description: "Subscription details for add - en_name, ar_name,licenseNumber,countryId,countryTitle,langaugeId,langaugeTitle,experience,jurisdiction,expertise,rating,isActive",
			          schema: { $en_name: "", $ar_name: "" ,  $isActive: "", $licenseNumber: "" , $countryId: "" ,$countryTitle:"", $langaugeId: "",$langaugeTitle:"",$serviceId:"", $rating: "" , $experience:"",$numOfLawyer: "", $taxType:"",$tax:"", $expertise: "",$jurisdiction:""}
        } */
		Subscription.update({
			// title: req.body.title,
			// description: req.body.description,
			// durationType: req.body.durationType,
			// discountPercent: req.body.discountPercent,
			// subscriptionType: req.body.subscriptionType,
			// price: req.body.price,
			// currency: req.body.currency,
			// numberOfMeeting: req.body.numberOfMeeting,
			// ipAudit: req.body.ipAudit,
			// meetingPlan: req.body.meetingPlan,
			// contractTemplates: req.body.contractTemplates,
			// contract_templates: req.body.contract_templates,
			// discount: req.body.discount,
			// images: req.body.images,
			logo: req.body.logo,
			// features: req.body.features,
			// sortnumber: req.body.sortnumber,
		},{where: {id: req.body.id}},
		).then((subscription) => {
				if (!subscription) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
			return apiResponses.successResponseWithData(
				res,
				'success!',
				subscription,
			);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getSubscriptions = (req, res) => {
	const limit = req.params.limit;
	Subscription.findAll({limit: limit, order: [['sortnumber', 'ASC']]})
		.then((data) => {
			// res.status(200).send({
			//   status: "200",
			//   user: data,
			// });
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                                description: "Error message",
                                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                            } */
			// return res.status(500).send({ message: err.message });
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving data.',
			});
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                    description: "Error message",
                    schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                } */
			// return res.status(500).send({ message: err.message });
			res.status(500).send({
				message: 'Something Went Wrong',
			});
		});
};

module.exports.getSubscriptionsType = (req, res) => {
	const durationType = req.params.durationType;
	Subscription.findAll({where: {
		durationType: durationType,
	}})
	Subscription.findAll({
		where: {
			durationType: durationType,
		},
		order: [['sortnumber', 'ASC']],
	})
		.then((data) => {
			// res.status(200).send({
			//   status: "200",
			//   user: data,
			// });
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                                description: "Error message",
                                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                            } */
			// return res.status(500).send({ message: err.message });
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving data.',
			});
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                    description: "Error message",
                    schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                } */
			// return res.status(500).send({ message: err.message });
			res.status(500).send({
				message: 'Something Went Wrong',
			});
		});
};
module.exports.getSubscription = (req, res) => {
	// Get Country from Database
	// #swagger.tags = ['Subscription']
	Subscription.findOne({
		where: {id: req.params.id},
	})
		.then((data) => {
			// res.status(200).send({
			//   status: "200",
			//   user: data,
			// });

			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                                  description: "Error message",
                                  schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                              } */
			// return res.status(500).send({ message: err.message });
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving LawFirm.',
			});
		});
};

module.exports.addSubscriptionPayment = async (req, res) => {
	try {
		SubscriptionPayment.create({
			subscriptionId: req.body.subscriptionId,
			userId: req.body.userId,
			paymentId: req.body.paymentId,
			paymentName: req.body.paymentName,
			application_fee_percent: req.body.application_fee_percent,
			billing_cycle_anchor: req.body.billing_cycle_anchor,
			billing_thresholds: req.body.billing_thresholds,
			canceled_at: req.body.canceled_at,
			cancel_at: req.body.cancel_at,
			cancel_at_period_end: req.body.cancel_at_period_end,
			collection_method: req.body.collection_method,
			current_period_end: req.body.current_period_end,
			current_period_start: req.body.current_period_start,
			customer: req.body.customer,
			days_until_due: req.body.days_until_due,
			default_payment_method: req.body.default_payment_method,
			default_source: req.body.default_source,
			discount: req.body.discount,
			ended_at: req.body.ended_at,
			latest_invoice: req.body.latest_invoice,
			livemode: req.body.livemode,
			next_pending_invoice_item_invoice: req.body.next_pending_invoice_item_invoice,
			pause_collection: req.body.pause_collection,
			pending_invoice_item_interval: req.body.pending_invoice_item_interval,
			pending_setup_intent: req.body.pending_setup_intent,
			pending_update: req.body.pending_update,
			plan: req.body.plan,
			quantity: req.body.quantity,
			schedule: req.body.schedule,
			start_date: req.body.start_date,
			status: req.body.status,
			transfer_data: req.body.transfer_data,
			trial_end: req.body.trial_end,
			trial_start: req.body.trial_start,
		}).then((subscriptionPayment) => {
			return apiResponses.successResponseWithData(
				res,
				'success!',
				subscriptionPayment,
			);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getAllSubscriptionPayment = (req, res) => {
	const limit = req.params.limit;
	SubscriptionPayment.findAll({limit: limit, order: [['createdAt', 'DESC']]})
		.then((data) => {
			// res.status(200).send({
			//   status: "200",
			//   user: data,
			// });

			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                                  description: "Error message",
                                  schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                              } */
			// return res.status(500).send({ message: err.message });
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving Data.',
			});
		});
};
