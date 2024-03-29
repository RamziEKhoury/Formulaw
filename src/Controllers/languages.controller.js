const db = require('../models');
const Language = db.language;
const apiResponses = require('../Components/apiresponse');
const Op = db.Sequelize.Op;

module.exports.addLanguage = async (req, res) => {
	try {
		// #swagger.tags = ['Language']
		/*  #swagger.parameters['obj'] = {
                    in: 'body',
                    description: "Language details for add - en_name, ar_name, isActive",
                    schema: { $en_name: "", $ar_name: "", $isActive: ""}
            } */
		Language.create({
				en_name: req.body.en_name,
				ar_name: req.body.ar_name,
				sortnumber: req.body.sortnumber,
				isActive: req.body.isActive,
			
		}).then((language) => {
				// return res.status(200).send({ status:'200', message: "success!" , data: languageData });
				return apiResponses.successResponseWithData(
					res,
					'success!',
					language,
				);
			
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.languageUpdate = async (req, res) => {
	// #swagger.tags = ['Language']
	/*  #swagger.parameters['obj'] = {
                            in: 'body',
                            description: "Language details for update - id en_name, ar_name, isActive",
                            schema: { $id: "", $en_name: "", $ar_name: "", $isActive: ""}
                    } */
	try {
		await Language.update(
			{
				en_name: req.body.en_name,
				ar_name: req.body.ar_name,
				sortnumber: req.body.sortnumber,
				isActive: req.body.isActive,
			},
			{where: {id: req.body.id}},
		)
			.then((language) => {
				if (!language) {
					/* #swagger.responses[404] = {
                               description: "Not found.",
                               schema: { $statusCode: "404",  $status: false, $message: "Not found.",  $data: {}}
                           } */
					// return res.status(404).send({ message: "Not found." });
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				/* #swagger.responses[200] = {
                            description: "success!",
                            schema: { $en_name: "en_name", $ar_name: "ar_name", $isActive: "isActive", $isDeleted: "isDeleted"}
                        } */
				// return res.status(200).send({ status:'200', message: "success!" , data: language });
				return apiResponses.successResponseWithData(res, 'Success', language);
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

module.exports.getLanguages = (req, res) => {
	// Get Country from Database
	// #swagger.tags = ['Language']
	const limit = req.params.limit;
	const search = req.query.searchText;

	if (!!search) {
		Language.findAndCountAll({
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
		Language.findAndCountAll({
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

module.exports.getLanguage = (req, res) => {
	// Get Country from Database
	// #swagger.tags = ['Language']
	Language.findOne({
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

module.exports.deleteLanguage = async (req, res) => {
	// #swagger.tags = ['Language']
	try {
		await Language.update(
			{
				isDeleted: 1,
			},
			{where: {id: req.params.id}},
		)
			.then((language) => {
				if (!language) {
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
				return apiResponses.successResponseWithData(res, 'Success', language);
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
		Language.findOne({
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