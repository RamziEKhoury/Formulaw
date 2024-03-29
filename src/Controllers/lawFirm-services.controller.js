const db = require('../models');
const LawFirmService = db.lawFirm_service;
const apiResponses = require('../Components/apiresponse');
const sequelize = require('sequelize');

module.exports.addLawFirmService = async (req, res) => {
	// get input values from reqeust.
	const serviceData = req.body.values;
	const lawFirmId = req.body.lawFirmId;

	try {
		if (serviceData === undefined || serviceData === '') {
			res.send({status: 409, msg: 'Service Data should not be empty.'});
		}

		if (req.body.isOldServiceDeleted) {
			await LawFirmService.destroy({
				where: {lawFirmId: lawFirmId},
			});
		}
		// Loop over service data to get individual fields. like title and id.
		serviceData.map((service, i) => {
			const services = {
				title: service.title,
				discription: service.discription,
				price: service.price,
				currency: service.currency,
				lawFirmId: lawFirmId,
				isActive: 1,
			};
			// #swagger.tags = ['LawFirmService']
			/*  #swagger.parameters['obj'] = {
						  in: 'body',
						  description: "LawFirmService details for add -lawFirmId,title,price,currency,discription,isActive",
						  schema: {$lawFirmId:"",$title:"",$price:"",$currency:"", $discription:"",$isActive:""}
			} */

			// Execute FindAndCreate query on table
			LawFirmService.create(services).then((lawFirmService) => {});
		});

		return apiResponses.successResponseWithData(res, 'success!');
	} catch (err) {
		// Error response of Query.
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.lawFirmServiceUpdate = async (req, res) => {
	// #swagger.tags = ['LawFirmService']
	/*  #swagger.parameters['obj'] = {
		in: 'body',
		 description: "LawFirmService details for add -lawFirmId,title,price,currency,discription,isActive",
						  schema: {$lawFirmId:"",$title:"",$price:"",$currency:"", $discription:"",$isActive:""}
                          */

	try {
		await LawFirmService.update(
			{
				title: req.body.title,
				price: req.body.price,
				currency: req.body.currency,
				discription: req.body.discription,
				isActive: req.body.isActive,
			},
			{where: {id: req.body.id}},
		)
			.then((LawFirmService) => {
				if (!LawFirmService) {
					/* #swagger.responses[404] = {
                               description: "LawFirmService Not found.",
                               schema: { $statusCode: "404",  $status: false, $message: "Not found.",  $data: {}}
                           } */
					// return res.status(404).send({ message: "Not found." });
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				/* #swagger.responses[200] = {
                            description: "success!",
                           schema: { $lawFirmId:"lawFirmId",$title:"title",$discription:"discription"  $isActive: "0"}

                        } */
				// return res.status(200).send({ status:'200', message: "success!" , data: lawFirm });
				return apiResponses.successResponseWithData(
					res,
					'Success',
					LawFirmService,
				);
			})
			.catch((err) => {
				/* #swagger.responses[500] = {
                            description: "Error message",
                            schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                        } */
				// return res.status(500).send({ message: err.message });
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getLawFirmServices = (req, res) => {
	// Get Lawfirm data from Database
	// #swagger.tags = ['LawFirmIndustry']
	LawFirmService.findAll({
		where: {lawFirmId: req.body.lawFirmId},
		isDeleted: 0,
		isActive: 1,
		order: [['createdAt', 'DESC']],
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
				message:
          err.message || 'Some error occurred while retrieving LawFirmService.',
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

module.exports.getLawFirmService = (req, res) => {
	// Get Country from Database
	// #swagger.tags = ['LawFirmIndustry']
	LawFirmService.findOne({
		where: {id: req.params.id, isDeleted: 0},
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
				message:
          err.message || 'Some error occurred while retrieving LawFirmService.',
			});
		});
};

module.exports.getLawFirmServiceMaxPrice = (req, res) => {
	LawFirmService.findAll({
		attributes: [[sequelize.fn('max', sequelize.col('price')), 'maxPrice']],
		raw: true,
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
          err.message || 'Some error occurred while retrieving LawFirmService.',
			});
		});
};

module.exports.lawFirmServiceDelete = async (req, res) => {
	// #swagger.tags = ['LawFirmService']
	/*  #swagger.parameters['obj'] = {
		in: 'body',
		 description: "LawFirmService details for add -lawFirmId,title,price,currency,discription,isActive",
						  schema: {$lawFirmId:"",$title:"",$price:"",$currency:"", $discription:"",$isActive:""}
                          */

	try {
		await LawFirmService.destroy({where: {id: req.body.id}})
			.then((LawFirmService) => {
				if (!LawFirmService) {
					/* #swagger.responses[404] = {
                               description: "LawFirmService Not found.",
                               schema: { $statusCode: "404",  $status: false, $message: "Not found.",  $data: {}}
                           } */
					// return res.status(404).send({ message: "Not found." });
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				/* #swagger.responses[200] = {
                            description: "success!",
                           schema: { $lawFirmId:"lawFirmId",$title:"title",$discription:"discription"  $isActive: "0"}

                        } */
				// return res.status(200).send({ status:'200', message: "success!" , data: lawFirm });
				return apiResponses.successResponseWithData(
					res,
					'Success',
					LawFirmService,
				);
			})
			.catch((err) => {
				/* #swagger.responses[500] = {
                            description: "Error message",
                            schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                        } */
				// return res.status(500).send({ message: err.message });
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.addMoreServices = async (req, res) => {
	try {
		if (req.body.title === undefined || req.body.title === '' ||
			req.body.discription === '' || req.body.discription === '' ||
			req.body.price === undefined || req.body.price === '' ||
			req.body.currency === undefined || req.body.price === '') {
			res.send({status: 400, msg: 'All fields should be mandatory'});
		}
		LawFirmService.create({
			title: req.body.title,
			discription: req.body.discription,
			price: req.body.price,
			currency: req.body.currency,
			lawFirmId: req.body.lawfirmId,
			isActive: 1,
		})
			.then((LawFirmService) => {
				// #swagger.tags = ['LawFirmService']
				/*  #swagger.parameters['obj'] = {
                                  in: 'body',
                                  description: "LawFirmService details for add -lawFirmId,title,price,currency,discription,isActive",
                                  schema: {$lawFirmId:"",$title:"",$price:"",$currency:"", $discription:"",$isActive:""}
                    } */

				return apiResponses.successResponseWithData(res, 'success!', LawFirmService);
			});
	} catch (err) {
		// Error response of Query.
		return apiResponses.errorResponse(res, err);
	}
};
