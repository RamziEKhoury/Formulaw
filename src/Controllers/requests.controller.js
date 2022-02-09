const db = require('../models');
const Request = db.request;
const Appointment = db.appointment;
const Services = db.service;
const User = db.user;
const apiResponses = require('../Components/apiresponse');
const Notifications = require('../Config/Notifications');
const {WorkflowAppointment} = require('../enum');
const Op = db.Sequelize.Op;

module.exports.createRequest = async (req, res) => {
	try {
		// #swagger.tags = ['Requests']
		/*  #swagger.parameters['obj'] = {
            in: 'body',
             description: "Request details for add - firstName, lastName,email,jurisdictionId,languageId,legalFieldId,legalFieldName,serviceSubcategoryId,serviceSubcategoryName,budgetMin,budgetMax,rating,lawFirmId, experience, isActive",
            schema: { $industryId: "", $industryTitle: "", $getstarted: "", $firstName: "", $lastName: "" ,  $email: "", $jurisdictionId: "" , $languageId: "" , $legalFieldId: "" ,$legalFieldName: "" ,$serviceSubcategoryId: "" ,$serviceSubcategoryName: "" , $budgetMin: "" , $budgetMax: "",$rating:"", $lawFirmId: "", $experience: "", $isActive: ""}
            } */

		Request.findOrCreate({
			where: {
				[Op.and]: [
					{getstarted: req.body.getstarted },
					{firstName: req.body.firstName },
					{lastName: req.body.lastName },
					{email: req.body.email },
				],
			},
			defaults: req.body,
		}).then(async(request) => {
			const isAlready = request[1];
			const inserted = request[0];

			if (!isAlready) {
				/* #swagger.responses[409] = {
                            description: "Already!",
                            schema: { $statusCode : 409 ,$status: true, $message: "Country already exist!", $data : {}}
                        } */
				res.send({
					status: 409,
					msg: 'request already exist',
				});
			} else {
				const requestData = {
					id: inserted.id,
					getstarted: inserted.getstarted,
					industryId: inserted.industryId,
					industryTitle: inserted.industryTitle,
					firstName: inserted.firstName,
					lastName: inserted.lastName,
					email: inserted.email,
					jurisdictionId: inserted.jurisdictionId,
					jurisdictionName: inserted.jurisdictionName,
					languageId: inserted.languageId,
					languageName: inserted.languageName,
					legalFieldId: inserted.legalFieldId,
					legalFieldName: inserted.legalFieldName,
					serviceSubcategoryId: inserted.serviceSubcategoryId,
					serviceSubcategoryName: inserted.serviceSubcategoryName,
					cost: inserted.cost,
					budgetMin: inserted.budgetMin,
					budgetMax: inserted.budgetMax,
					rating: inserted.rating,
					experience: inserted.experience,
					lawFirmId: inserted.lawFirmId,
					isActive: inserted.isActive,
					isDeleted: inserted.isDeleted,
				};
		const service = await Services.findOne({where: {id: requestData.legalFieldId}})
			            await Services.update({count: service.count+1}, {where: {id: requestData.legalFieldId}});

			const device = await User.findOne({where: {id: req.body.userId}});
			const notiData = {
				title: requestData.getstarted,
				message: 'Your lead has been created successfully.',
				senderName: device.firstname + ' ' + device.lastname,
				senderId: req.body.userId,
				senderType: 'LEAD',
				receiverid: req.body.userId,
				notificationType: WorkflowAppointment.CREAT_LEAD,
				target: req.body.userId,
			};
			await Notifications.notificationCreate(notiData);
			if (!!device.deviceToken) {
				await Notifications.notification(device.deviceToken,
					'Your lead has been created successfully, Please select any slots.');
			}

			return apiResponses.successResponseWithData(
				res,
				'success!',
				requestData,
			);
		}
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
            schema: { $id: "", $getstarted:"", $firstName: "", $lastName: "" ,  $email: "", $jurisdictionId: "" , $languageId: "" , $legalFieldId: "" ,$legalFieldName: "" ,$serviceSubcategoryId: "" ,$serviceSubcategoryName: "" , $budgetMin: "" , $budgetMax: "",$rating:"", $lawFirmId: "", $experience: "", $isActive: ""}
              } */

	try {
		await Request.update(
			{
				getstarted: req.body.getstarted,
				industryId: req.body.industryId,
				industryTitle: req.body.industryTitle,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				jurisdictionId: req.body.jurisdictionId,
				jurisdictionName: req.body.jurisdictionName,
				languageId: req.body.languageId,
				languageName: req.body.languageName,
				legalFieldId: req.body.legalFieldId,
				legalFieldName: req.body.legalFieldName,
				serviceSubcategoryId: req.body.serviceSubcategoryId,
				serviceSubcategoryName: req.body.serviceSubcategoryName,
				cost: req.body.cost,
				budgetMin: req.body.budgetMin,
				budgetMax: req.body.budgetMax,
				rating: req.body.rating,
				experience: req.body.experience,
				questionOne: req.body.questionOne,
				questionTwo: req.body.questionTwo,
				questionThree: req.body.questionThree,
				questionFour: req.body.questionFour,
				questionFive: req.body.questionFive,
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
						schema: { $getstarted: "getstarted", $firstName: "firstName", $lastName: "lastName" ,  $email: "email", $jurisdictionId: "jurisdictionId" , $languageId: "languageId" , $legalFieldId: "legalFieldId" ,$legalFieldName: "legalFieldName" ,$serviceSubcategoryId: "serviceSubcategoryId" ,$serviceSubcategoryName: "serviceSubcategoryName" , $budgetMin: "budgetMin" , $budgetMax: "budgetMax",$rating:"rating", $lawFirmId: "lawFirmId", $experience: "experience", $isActive: 1}
					} */
				// return res.status(200).send({ status:'200', message: "success!" , data: lawFirm });

				Appointment.update(
					{
						lawFirmId: req.body.lawFirmId,
					},
					{
						where: {queryId: req.body.id},
					},
				).then((appointment) => {
					if (!appointment) {
						return apiResponses.notFoundResponse(res, 'Not found.', {});
					}
				});
				return apiResponses.successResponseWithData(res, 'Success', request);
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
			order: [[Request, 'createdAt', 'ASC']],
			limit: limit,
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
            err.message || 'Some error occurred while retrieving request.',
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
				message: err.message || 'Some error occurred while retrieving LawFirm.',
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
				return apiResponses.successResponseWithData(res, 'Success', request);
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
