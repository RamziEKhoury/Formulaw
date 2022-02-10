const db = require('../models');
const ServiceSubcategory = db.service_subCategory;
const apiResponses = require('../Components/apiresponse');
const Op = db.Sequelize.Op;

module.exports.addServiceSubCategory = async (req, res) => {
	try {
		// #swagger.tags = ['Service']
		/*  #swagger.parameters['obj'] = {
                    in: 'body',
                    description: "service details for add - en_name, ar_name, isActive, description,isBillable",
                    schema: { $serviceId: "", $en_name: "", $ar_name: "", $isActive: "", $description: "",$isBillable:""}
            } */
		ServiceSubcategory.create({
				serviceId: req.body.serviceId,
				en_name: req.body.en_name,
				ar_name: req.body.ar_name,
				description: req.body.description,
				sortnumber: req.body.sortnumber,
				// isBillable: req.body.isBillable,
				isActive: req.body.isActive,
		}).then((subCategory) => {
				// return res.status(200).send({ status:'200', message: "success!" , data: subCategoryData });
				return apiResponses.successResponseWithData(
					res,
					'success!',
					subCategory,
				);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.subCategoryUpdate = async (req, res) => {
	// #swagger.tags = ['Service']
	/*  #swagger.parameters['obj'] = {
                            in: 'body',
                            description: "Details for add - en_name, ar_name, isActive, description,isBillable",
                            schema: { $serviceId: "", $id: "", $en_name: "", $ar_name: "", $isActive: "", $description: "",$isBillable:""}
                    } */
	try {
		await ServiceSubcategory.update(
			{
				en_name: req.body.en_name,
				serviceId: req.body.serviceId,
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

module.exports.getServiceSubcategories = (req, res) => {
	// Get Industrials from Database
	// #swagger.tags = ['Service']
	const limit = req.params.limit;
	const serviceId = req.params.serviceId;
	const search = req.query.searchText;

	if (!!search) {
		ServiceSubcategory.findAndCountAll({
			where: {
				[Op.or]: [
					{
						en_name: {[Op.like]: `%${search}%`},
					},
					{
						ar_name: {[Op.like]: `%${search}%`},
					},
					{
						serviceId: {[Op.like]: `%${serviceId}%`},
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
		ServiceSubcategory.findAndCountAll({
			where: {
				serviceId: req.params.serviceId,
				isDeleted: 0,
				isActive: 1,
			},
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

module.exports.getSubCategory = (req, res) => {
	// Get Industrial from Database
	// #swagger.tags = ['Service']
	ServiceSubcategory.findOne({
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

module.exports.deleteSubcategory = async (req, res) => {
	// #swagger.tags = ['Service']
	try {
		await ServiceSubcategory.update(
			{
				isDeleted: 1,
			},
			{where: {id: req.params.id}},
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

module.exports.sortnumberVarify = async (req, res) => {
	try {
		ServiceSubcategory.findOne({
			where: {
				serviceId: req.params.id,
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
