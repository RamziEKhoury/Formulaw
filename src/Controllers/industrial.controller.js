const db = require('../models');
const Industrial = db.industrial;
const apiResponses = require('../Components/apiresponse');
const Op = db.Sequelize.Op;

module.exports.addIndustrial = async (req, res) => {
	try {
		// #swagger.tags = ['Industrial']
		/*  #swagger.parameters['obj'] = {
                    in: 'body',
                    description: "Industrial details for add - en_name, ar_name, isActive, description,isBillable",
                    schema: { $en_name: "", $ar_name: "", $isActive: "", $description: "",isBillable:""}
            } */
		Industrial.findOrCreate({
			where: {
				en_name: {[Op.iLike]: '%' + req.body.en_name + '%'},
			},

			defaults: {
				en_name: req.body.en_name,
				ar_name: req.body.ar_name,
				description: req.body.description,
				// isBillable: req.body.isBillable,
				isActive: req.body.isActive,
			},
		}).then((industrial) => {
			const isAlready = industrial[1];
			const inserted = industrial[0];

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
				const industrialData = {
					id: inserted.id,
					en_name: inserted.en_name,
					ar_name: inserted.ar_name,
					description: inserted.description,
					// isBillable: inserted.isBillable,
					isActive: inserted.isActive,
					isDeleted: inserted.isDeleted,
				};
				// return res.status(200).send({ status:'200', message: "success!" , data: industrialData });
				return apiResponses.successResponseWithData(
					res,
					'success!',
					industrialData,
				);
			}
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.industrialUpdate = async (req, res) => {
	// #swagger.tags = ['Industrial']
	/*  #swagger.parameters['obj'] = {
                            in: 'body',
                            description: "Details for add - en_name, ar_name, isActive, description, isBillable",
                            schema: { $id: "", $en_name: "", $ar_name: "", $isActive: "", $description: "", isBillable:""}
                    } */
	try {
		await Industrial.update(
			{
				en_name: req.body.en_name,
				ar_name: req.body.ar_name,
				description: req.body.description,
				// isBillable: req.body.isBillable,
				isActive: req.body.isActive,
			},
			{where: {id: req.body.id}},
		)
			.then((industrial) => {
				if (!industrial) {
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
				return apiResponses.successResponseWithData(res, 'Success', industrial);
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

module.exports.getIndustrials = (req, res) => {
	// Get Industrials from Database
	// #swagger.tags = ['Industrial']
	const offset = req.params.offset;
	const limit = req.params.limit;
	const search = req.query.searchText;

	if (!!search) {
		Industrial.findAndCountAll({
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
		Industrial.findAndCountAll({
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

module.exports.getIndustrial = (req, res) => {
	// Get Industrial from Database
	// #swagger.tags = ['Industrial']
	Industrial.findOne({
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

module.exports.deleteIndustrial = async (req, res) => {
	// #swagger.tags = ['Industrial']
	try {
		await Industrial.update(
			{
				isDeleted: 1,
			},
			{where: {id: req.params.id}},
		)
			.then((industrial) => {
				if (!industrial) {
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
				return apiResponses.successResponseWithData(res, 'Success', industrial);
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
