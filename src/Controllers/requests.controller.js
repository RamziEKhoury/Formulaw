const db = require('../models');
const Request = db.request;
const apiResponses = require('../Components/apiresponse');
const Op = db.Sequelize.Op;

module.exports.createRequest = async (req, res) => {
	try {
		// #swagger.tags = ['Requests']
		console.log(req.body.en_name);
		/*  #swagger.parameters['obj'] = {
            in: 'body',
             description: "Request details for add - firstName, lastName,email,jurisdictionId,languageId,legalFieldId,legalFieldName,serviceSubcategoryId,serviceSubcategoryName,budgetMin,budgetMax,rating,lawFirmId, experience, isActive",
            schema: { $firstName: "", $lastName: "" ,  $email: "", $jurisdictionId: "" , $languageId: "" , $legalFieldId: "" ,$legalFieldName: "" ,$serviceSubcategoryId: "" ,$serviceSubcategoryName: "" , $budgetMin: "" , $budgetMax: "",$rating:"", $lawFirmId: "", $experience: "", $isActive: ""}
            } */

		Request.create({
			defaults: {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				jurisdictionId: req.body.jurisdictionId,
				languageId: req.body.languageId,
				legalFieldId: req.body.legalFieldId,
				legalFieldName: req.body.legalFieldName,
				serviceSubcategoryId: req.body.serviceSubcategoryId,
				serviceSubcategoryName: req.body.serviceSubcategoryName,
				budgetMin: req.body.budgetMin,
				budgetMax: req.body.budgetMax,
				rating: req.body.rating,
				experience: req.body.experience,
				lawFirmId: req.body.lawFirmId,
				isActive: req.body.isActive,
			},
		}).then((request) => {
			const createdRequest = {
				id: request.id,
				firstName: request.firstName,
				lastName: request.lastName,
				email: request.email,
				jurisdictionId: request.jurisdictionId,
				languageId: request.languageId,
				legalFieldId: request.legalFieldId,
				legalFieldName: request.legalFieldName,
				serviceSubcategoryId: request.serviceSubcategoryId,
				serviceSubcategoryName: request.serviceSubcategoryName,
				budgetMin: request.budgetMin,
				budgetMax: request.budgetMax,
				rating: request.rating,
				experience: request.experience,
				lawFirmId: request.lawFirmId,
				isActive: request.isActive,
				isDeleted: request.isDeleted,
			};
				// return res.status(200).send({ status:'200', message: "success!" , $data: createdRequest });
			return apiResponses.successResponseWithData(
				res,
				'success!',
				createdRequest,
			);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};


module.exports.requestUpdate = async (req, res) => {
	// #swagger.tags = ['Requests']
	/*  #swagger.parameters['obj'] = {
        in: 'body',
          description: "Request details for add - id, firstName, lastName,email,jurisdictionId,languageId,legalFieldId,legalFieldName,serviceSubcategoryId,serviceSubcategoryName,budgetMin,budgetMax,rating,lawFirmId, experience, isActive",
            schema: { $id: "", $firstName: "", $lastName: "" ,  $email: "", $jurisdictionId: "" , $languageId: "" , $legalFieldId: "" ,$legalFieldName: "" ,$serviceSubcategoryId: "" ,$serviceSubcategoryName: "" , $budgetMin: "" , $budgetMax: "",$rating:"", $lawFirmId: "", $experience: "", $isActive: ""}
              } */

	try {
		await Request.update(
			{
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				jurisdictionId: req.body.jurisdictionId,
				languageId: req.body.languageId,
				legalFieldId: req.body.legalFieldId,
				legalFieldName: req.body.legalFieldName,
				serviceSubcategoryId: req.body.serviceSubcategoryId,
				serviceSubcategoryName: req.body.serviceSubcategoryName,
				budgetMin: req.body.budgetMin,
				budgetMax: req.body.budgetMax,
				rating: req.body.rating,
				experience: req.body.experience,
				lawFirmId: req.body.lawFirmId,
				isActive: req.body.isActive,
			},
			{where: {id: req.body.id}},
		)
			.then((request) => {
				if (!request) {
					/* #swagger.responses[404] = {
                               description: "Not found.",
                               schema: { $statusCode: "404",  $status: false, $message: "Not found.",  $data: {}}
                           } */
					// return res.status(404).send({ message: "Not found." });
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				/* #swagger.responses[200] = {
						description: "success!",
						schema: { $firstName: "firstName", $lastName: "lastName" ,  $email: "email", $jurisdictionId: "jurisdictionId" , $languageId: "languageId" , $legalFieldId: "legalFieldId" ,$legalFieldName: "legalFieldName" ,$serviceSubcategoryId: "serviceSubcategoryId" ,$serviceSubcategoryName: "serviceSubcategoryName" , $budgetMin: "budgetMin" , $budgetMax: "budgetMax",$rating:"rating", $lawFirmId: "lawFirmId", $experience: "experience", $isActive: 1}
					} */
				// return res.status(200).send({ status:'200', message: "success!" , data: lawFirm });
				return apiResponses.successResponseWithData(
					res,
					'Success',
					request,
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


module.exports.getRequests = (req, res) => {
	// Get request data from Database
	// #swagger.tags = ['Requests']

	const limit = req.params.limit;
	const search = req.params.searchText;

	if (!!search) {
		Request.findAndCountAll({
			where: {
				[Op.or]: [
					{
						firstName: {[Op.like]: `%${search}%`},
					},
					{
						lastName: {[Op.like]: `%${search}%`},
					},
					{
						legalFieldName: {[Op.like]: `%${search}%`},
					},

				],
				isDeleted: 0,
				isActive: 1,
			},
			limit: limit,
		})
			.then((data) => {
				// res.status(200).send({
				//   status: "200",
				//   user: data,
				// });
				return apiResponses.successResponseWithData(
					res,
					'success',
					data,
				);
			})
			.catch((err) => {
				/* #swagger.responses[500] = {
                                description: "Error message",
                                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                            } */
				// return res.status(500).send({ message: err.message });
				res.status(500).send({
					message:
                        err.message ||
						'Some error occurred while retrieving request.',
				});
			});
	} else {
		Request.findAndCountAll({
			where: {isDeleted: 0, isActive: 1},
			limit: limit,
		})
			.then((result) => {
				// res.status(200).send({
				//   status: "200",
				//   user: result,
				// });
				return apiResponses.successResponseWithData(
					res,
					'success',
					result,
				);
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


module.exports.getRequest = (req, res) => {
	// Get request from Database
	// #swagger.tags = ['Requests']
	Request.findOne({
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
				message: err.message ||
                    'Some error occurred while retrieving LawFirm.',
			});
		});
};


module.exports.deleteLawRequest = async (req, res) => {
	// #swagger.tags = ['Requests']
	try {
		await Request.update(
			{
				isDeleted: 1,
			},
			{where: {id: req.params.id}},
		)
			.then((request) => {
				if (!request) {
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
				// return res.status(200).send({ status:'200', message: "success!" , data: lawFirm });
				return apiResponses.successResponseWithData(
					res,
					'Success',
					request,
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
