const db = require('../models');
const Subscription = db.subscription;
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
