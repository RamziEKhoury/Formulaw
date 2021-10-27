const db = require('../models');
const Subscription = db.subscription;
const apiResponses = require('../Components/apiresponse');

module.exports.addSubscription = async (req, res) => {
	// console.log("dfdgsgdfh",req.body);
	try {
		// #swagger.tags = ['Subscription']
		console.log(req.body.title);
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
			images: req.body.images,
			logo: req.body.logo,
			features: req.body.features,

		}).then((subscription) => {
			// console.log('subscription--->', subscription);

			// return res.status(200).send({ status:'200', message: "success!" , $data: lawfirmdata });
			return apiResponses.successResponseWithData(
				res,
				'success!',
				subscription,
			);
		},
		);
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};


module.exports.getSubscriptions = (req, res) => {
	const limit = req.params.limit;
	Subscription.findAll({limit: limit})
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
				message:
            err.message || 'Some error occurred while retrieving data.',
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
	console.log(durationType);
	Subscription.findAll({where: {
		durationType: durationType,
	}})
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
				message:
            err.message || 'Some error occurred while retrieving data.',
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

