const db = require('../models');
const Lawyer = db.lawyer;
const User = db.user;
const Appointment = db.appointment;
const apiResponses = require('../Components/apiresponse');
const bcrypt = require('bcryptjs');
const Mail = require('../Config/Mails');
const {UserRole, WorkflowAppointment} = require('../enum');
const Op = db.Sequelize.Op;

// eslint-disable-next-line require-jsdoc
function generatePassword() {
	const length = 8;
	const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let retVal = '';
	for (let i = 0, n = charset.length; i < length; ++i) {
		retVal += charset.charAt(Math.floor(Math.random() * n));
	}
	return retVal;
}

module.exports.addLawyer = async (req, res) => {
	console.log('dfdgsgdfh', req.body);
	try {
		// #swagger.tags = ['Lawyer']
		/*  #swagger.parameters['obj'] = {
			          in: 'body',
			          description: "Lawyer details for add - en_name, ar_name,licenseNumber,countryId,countryTitle,langaugeId,langaugeTitle,experience,jurisdiction,expertise,rating,isActive",
			          schema: { $en_name: "", $ar_name: "" ,  $isActive: "", $licenseNumber: "" , $countryId: "" ,$countryTitle:"", $langaugeId: "",$langaugeTitle:"",$serviceId:"", $rating: "" , $experience:"",$numOfLawyer: "", $taxType:"",$tax:"", $expertise: "",$jurisdiction:""}
        } */
		Lawyer.findOrCreate({
			where: {
				[Op.or]: [
					{en_name: {[Op.iLike]: '%' + req.body.en_name + '%'}},
					{ar_name: {[Op.iLike]: '%' + req.body.ar_name + '%'}},
				],
			},
			defaults: {
				en_name: req.body.en_name,
				ar_name: req.body.ar_name,
				email: req.body.email,
				lawFirmId: req.body.lawFirmId,
				licenseNumber: req.body.licenseNumber,
				countryId: req.body.countryId,
				countryTitle: req.body.countryTitle,
				industryId: req.body.industryId,
				industryTitle: req.body.industryTitle,
				serviceId: req.body.serviceId,
				serviceTitle: req.body.serviceTitle,
				languageId: req.body.languageId,
				languageTitle: req.body.languageTitle,
				expertise: req.body.expertise,
				jurisdiction: req.body.jurisdiction,
				logo: req.body.logo,
				images: req.body.images,
				rating: req.body.rating,
				experience: req.body.experience,
				isActive: req.body.isActive,
			},
		}).then(async (lawyer) => {
			// console.log('lawyer--->', lawyer);
			const isAlready = lawyer[1];
			const inserted = lawyer[0];

			if (!isAlready) {
				/* #swagger.responses[409] = {
					description: "Already!",
					schema: { $statusCode : 409 ,$status: true, $message: "lawer already exist!", $data : {}}
				} */
				res.send({
					status: 409,
					msg: 'Lawyer already exist',
				});
			} else {
				const password = generatePassword();
				const user = await User.create({
					firstname: inserted.en_name,
					lastname: null,
					lawyer_id: inserted.id,
					email: inserted.email,
					role: UserRole.LAWYER,
					username: inserted.email,
					password: bcrypt.hashSync(password, 8),
					userType: 'normal',
					lawfirmid: req.body.lawFirmId,
					isActive: req.body.isActive,
				});
				await Lawyer.update({user_id: user.id}, {where: {id: inserted.id}});
				await Mail.lawyerRegistration(inserted.email, password);
				const lawyerData = {
					en_name: inserted.en_name,
					ar_name: inserted.ar_name,
					lawFirmId: inserted.lawFirmId,
					licenseNumber: inserted.licenseNumber,
					countryId: inserted.countryId,
					countryTitle: inserted.countryTitle,
					industryId: inserted.industryId,
					industryTitle: inserted.industryTitle,
					serviceId: inserted.serviceId,
					serviceTitle: inserted.serviceTitle,
					languageId: inserted.languageId,
					languageTitle: inserted.languageTitle,
					experience: inserted.experience,
					jurisdiction: inserted.jurisdiction,
					expertise: inserted.expertise,
					rating: inserted.rating,
					isActive: inserted.isActive,
					isDeleted: inserted.isDeleted,
				};
				// return res.status(200).send({ status:'200', message: "success!" , $data: lawfirmdata });
				return apiResponses.successResponseWithData(
					res,
					'success!',
					lawyerData,
				);
			}
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.lawyerUpdate = async (req, res) => {
	// #swagger.tags = ['Lawyer']
	/*  #swagger.parameters['obj'] = {
		in: 'body',
		 description: "Lawyer details for add - en_name, ar_name,licenseNumber,countryId,countryTitle,langaugeId,langaugeTitle,logo,images,experience,price,currency,numOfLawyer,jurisdiction,expertise,rating,taxType,tax, isActive",
			schema: { $en_name: "", $ar_name: "" ,  $isActive: "", $licenseNumber: "" , $countryId: "" ,$countryTitle:"", $langaugeId: "",$logo: "",$images:"",$price: "" ,$currency: "", $rating: "" , $experience: "",$taxType:"",$tax:"", $numOfLawyer: "", $jurisdiction: "", $expertise: ""}
            } */

	try {
		await Lawyer.update(
			{
				id: req.body.id,
				en_name: req.body.en_name,
				ar_name: req.body.ar_name,
				licenseNumber: req.body.licenseNumber,
				countryId: req.body.countryId,
				countryTitle: req.body.countryTitle,
				industryId: req.body.industryId,
				industryTitle: req.body.industryTitle,
				serviceId: req.body.serviceId,
				serviceTitle: req.body.serviceTitle,
				languageId: req.body.languageId,
				languageTitle: req.body.languageTitle,
				expertise: req.body.expertise,
				numOfLawyer: req.body.numOfLawyer,
				rating: req.body.rating,
				experience: req.body.experience,
				isActive: req.body.isActive,
			},
			{where: {id: req.body.id}},
		)
			.then((lawyer) => {
				if (!lawyer) {
					/* #swagger.responses[404] = {
                               description: "lawyer Not found.",
                               schema: { $statusCode: "404",  $status: false, $message: "Not found.",  $data: {}}
                           } */
					// return res.status(404).send({ message: "Not found." });
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				/* #swagger.responses[200] = {
                            description: "success!",
                           schema: { $en_name: "en_name", $ar_name: "ar_name" ,  $isActive: "0", $licenseNumber: "licenseNumber" , $countryId: "countryId" ,$countryTitle:"countryTitle", $langaugeId: "langaugeId",$langaugeTitle:"langaugeTitle",$logo: "logo",$images:"images", $rating: "rating" , $experience: "experience", $numOfLawyer: "numOfLawyer", $jurisdiction: "jurisdiction", $expertise: "expertise",$taxtype:"taxType",$tax:"tax"}

                        } */
				// return res.status(200).send({ status:'200', message: "success!" , data: lawyer });
				return apiResponses.successResponseWithData(res, 'Success', lawyer);
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

module.exports.getLawyers = (req, res) => {
	// Get Lawyer data from Database
	// #swagger.tags = ['Lawyer']

	const limit = req.params.limit;

	Lawyer.findAll({
		where: {lawFirmId: req.params.lawFirmId},
		isDeleted: 0,
		isActive: 1,
		order: [['createdAt', 'DESC']],
	})
		.then(async (data) => {
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
				message: err.message || 'Some error occurred while retrieving Lawyers.',
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

module.exports.getLawyer = (req, res) => {
	// Get Country from Database
	// #swagger.tags = ['LawFirm']
	Lawyer.findOne({
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

module.exports.deleteLawyer = async (req, res) => {
	// #swagger.tags = ['LawFirm']
	try {
		await Lawyer.update(
			{
				isDeleted: 1,
			},
			{where: {id: req.params.id}},
		)
			.then((lawyer) => {
				if (!lawyer) {
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
				// return res.status(200).send({ status:'200', message: "success!" , data: lawyer });
				return apiResponses.successResponseWithData(res, 'Success', lawyer);
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


module.exports.getLawyerStatuses = (req, res) => {
	// Get Lawyer data from Database
	// #swagger.tags = ['Lawyer']

	Lawyer.findAll({
		where: {lawFirmId: req.params.lawFirmId},
		isDeleted: 0,
		isActive: 1,
		order: [['createdAt', 'DESC']],
	})
		.then(async (data) => {
			// res.status(200).send({
			//   status: "200",
			//   user: data,
			// });
			const lawyerStatuses = [];
			for (let i = 0; i < data.length; i++) {
				const appointmentsPending = await Appointment.count({
					where: {
						lawyerId: data[i].user_id,
						status: WorkflowAppointment.CONSULTATION,
					},
				});
				const appointmentsOpen = await Appointment.count({
					where: {
						lawyerId: data[i].user_id,
						status: WorkflowAppointment.CONSULTATION,
					},
				});
				const appointmentsComplete = await Appointment.count({
					where: {
						lawyerId: data[i].user_id,
						status: WorkflowAppointment.COMPLETED,
					},
				});
				const obj = {
					lawyer: data[i],
					appointmentsPending,
					appointmentsOpen,
					appointmentsComplete,
				};
				lawyerStatuses.push(obj);
			}
			return apiResponses.successResponseWithData(res, 'success', lawyerStatuses);
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                                description: "Error message",
                                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                            } */
			// return res.status(500).send({ message: err.message });
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving Lawyers.',
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


module.exports.getLawyerTotalCases = (req, res) => {
	// Get Lawyer data from Database
	// #swagger.tags = ['Lawyer']

	Lawyer.findAll({
		where: {lawFirmId: req.params.lawFirmId},
		isDeleted: 0,
		isActive: 1,
		order: [['createdAt', 'DESC']],
	})
		.then(async (data) => {
			// res.status(200).send({
			//   status: "200",
			//   user: data,
			// });
			const lawyerTotalCase = [];
			for (let i = 0; i < data.length; i++) {
				const totalCases = await Appointment.count({
					where: {
						lawyerId: data[i].user_id,
					},
				});
				const obj = {
					lawyer: data[i],
					totalCases,
				};
				lawyerTotalCase.push(obj);
			}
			return apiResponses.successResponseWithData(res, 'success', lawyerTotalCase);
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                                description: "Error message",
                                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                            } */
			// return res.status(500).send({ message: err.message });
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving Lawyers.',
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
