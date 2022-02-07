const db = require('../models');
const Services = db.service;
const apiResponses = require('../Components/apiresponse');
const Op = db.Sequelize.Op;

module.exports.addService = async (req, res) => {
	try {
		console.log(req.body.en_name);
		// #swagger.tags = ['Service']
		/*  #swagger.parameters['obj'] = {
                    in: 'body',
                    description: "service details for add - en_name, ar_name, isActive, description,isBillable",
                    schema: { $en_name: "", $ar_name: "", $isActive: "", $description: "",$isBillable:""}
            } */
		Services.findOrCreate({
			where: {
				en_name: req.body.en_name,
			},

			defaults: {
				en_name: req.body.en_name,
				ar_name: req.body.ar_name,
				description: req.body.description,
				sortnumber: req.body.sortnumber,
				// isBillable: req.body.isBillable,
				isActive: req.body.isActive,
			},
		}).then((service) => {
			console.log('counter--->', service);
			const isAlready = service[1];
			const inserted = service[0];

			if (!isAlready) {
				/* #swagger.responses[409] = {
                            description: "Already!",
                            schema: { $statusCode : 409 ,$status: true, $message: "Already exist!", $data : {}}
                        } */
				res.send({
					status: 409,
					msg: 'Already exist',
				});
			} else {
				const serviceData = {
					id: inserted.id,
					en_name: inserted.en_name,
					ar_name: inserted.ar_name,
					description: inserted.description,
					sortnumber: inserted.sortnumber,
					// isBillable: inserted.isBillable,
					isActive: inserted.isActive,
					isDeleted: inserted.isDeleted,
				};
				// return res.status(200).send({ status:'200', message: "success!" , data: serviceData });
				return apiResponses.successResponseWithData(
					res,
					'success!',
					serviceData,
				);
			}
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.serviceUpdate = async (req, res) => {
	// #swagger.tags = ['Service']
	/*  #swagger.parameters['obj'] = {
                            in: 'body',
                            description: "Details for add - en_name, ar_name, isActive, description,isBillable",
                            schema: { $id: "", $en_name: "", $ar_name: "", $isActive: "", $description: "",isBillable:""}
                    } */
	try {
		await Services.update(
			{
				en_name: req.body.en_name,
				ar_name: req.body.ar_name,
				description: req.body.description,
				sortnumber: req.body.sortnumber,
				// isBillable: req.body.isBillable,
				isActive: req.body.isActive,
			},
			{where: {id: req.body.id}},
		)
			.then((subCategory) => {
				if (!subCategory) {
					/* #swagger.responses[404] = {
                               description: "Not found.",
                               schema: { $statusCode: "404",  $status: false, $message: "Not found.",  $data: {}}
                           } */
					// return res.status(404).send({ message: "Not found." });
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				/* #swagger.responses[200] = {
                            description: "success!",
                            schema: { $en_name: "en_name", $ar_name: "en_name", $description: "description",$isBillable:"isBillable", $isActive: 0, $isDeleted: 0}
                        } */
				// return res.status(200).send({ status:'200', message: "success!" , data: industrial });
				return apiResponses.successResponseWithData(
					res,
					'Success',
					subCategory,
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

module.exports.getServices = (req, res) => {
	// Get Industrials from Database
	// #swagger.tags = ['Service']
	const offset = req.params.offset;
	const limit = req.params.limit;
	const search = req.query.searchText;

	if (!!search) {
		Services.findAndCountAll({
			where: {
				[Op.or]: [
					{
						en_name: {[Op.like]: `%${search}%`},
					},
					{
						ar_name: {[Op.like]: `%${search}%`},
					},
				],
				isDeleted: 0,
				isActive: 1,
			},
			limit: limit,
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
					message:
            err.message || 'Some error occurred while retrieving Country.',
				});
			});
	} else {
		Services.findAndCountAll({
			where: {isDeleted: 0, isActive: 1},
			limit: limit,
			order: [['sortnumber', 'ASC']],
		})
			.then((result) => {
				// res.status(200).send({
				//   status: "200",
				//   user: result,
				// });
				return apiResponses.successResponseWithData(res, 'success', result);
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
	}
};

module.exports.getService = (req, res) => {
	// Get Industrial from Database
	// #swagger.tags = ['Service']
	Services.findOne({
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
				message: err.message || 'Some error occurred while retrieving Country.',
			});
		});
};

module.exports.deleteService = async (req, res) => {
	// #swagger.tags = ['Service']
	try {
		await Services.update(
			{
				isDeleted: 1,
			},
			{where: {id: req.params.id}},
		)
			.then((service) => {
				if (!service) {
					/* #swagger.responses[404] = {
                               description: "Not found.",
                               schema: { $statusCode: "404",  $status: false, $message: "Not found.",  $data: {}}
                           } */
					// return res.status(404).send({ message: "Not found." });
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				/* #swagger.responses[200] = {
                            description: "success!",
                        } */
				// return res.status(200).send({ status:'200', message: "success!" , data: industrial });
				return apiResponses.successResponseWithData(res, 'Success', service);
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

module.exports.getTopServices = (req, res) => {
	// Get Industrial from Database
	// #swagger.tags = ['Service']
	const limit = req.params.limit;
	Services.findAll({ limit: limit,
		isDeleted: 0,
		order: [['count', 'DESC']],
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
				message: err.message || 'Some error occurred while retrieving Country.',
			});
		});
};

module.exports.sortnumberVarify = async (req, res) => {
	try {
		Services.findOne({
			where: {
				sortnumber: req.body.sortnumber,
				isDeleted: 0,
			},
		}).then(async (result) => {
			/* #swagger.responses[404] = {
                   description: "Email Not found.",
                   schema: { $statusCode: "404",  $status: false, $message: "User Not found.",  $data: {}}
               } */
			// return res.status(404).send({ message: "Email Not found." });

			return apiResponses.successResponseWithData(res, 'success!', result);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};