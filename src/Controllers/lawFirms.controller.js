const db = require('../models');
const LawFirm = db.lawFirm;
const LawFirmService = db.lawFirm_service;
const LawFirmIndustry = db.lawFirm_industry;
const LawFirmTax = db.lawFirm_tax;
const User = db.user;
const Lawyer = db.lawyer;
const apiResponses = require('../Components/apiresponse');
const {UserRole} = require('../enum');
const bcrypt = require('bcryptjs');
const Mail = require('../Config/Mails');
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

module.exports.addLawFirm = async (req, res) => {
	try {
		// #swagger.tags = ['LawFirm']
		console.log(req.body.en_name);
		/*  #swagger.parameters['obj'] = {
			          in: 'body',
			          description: "LawFirm details for add - en_name, ar_name,licenseNumber,countryId,countryTitle,langaugeId,langaugeTitle,logo,images,experience,currency,numOfLawyer,jurisdiction,expertise,rating,taxType,tax, isActive",
			          schema: { $en_name: "", $ar_name: "" ,  $isActive: "", $licenseNumber: "" , $countryId: "" ,$countryTitle:"", $langaugeId: "",$langaugeTitle:"",$logo: "",$images:"" ,$currency: "",$serviceId:"", $rating: "" , $experience:"",$numOfLawyer: "", $taxType:"",$tax:"", $expertise: "",$jurisdiction:""}
        } */
		LawFirm.findOrCreate({
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
				licenseNumber: req.body.licenseNumber,
				countryId: req.body.countryId,
				countryTitle: req.body.countryTitle,
				languageId: req.body.languageId,
				languageTitle: req.body.languageTitle,
				logo: req.body.logo,
				images: req.body.images,
				expertise: req.body.expertise,
				numOfLawyer: req.body.numOfLawyer,
				jurisdiction: req.body.jurisdiction,
				rating: req.body.rating,
				experience: req.body.experience,
				isActive: req.body.isActive,
			},
		}).then(async (lawFirm) => {
			const isAlready = lawFirm[1];
			const inserted = lawFirm[0];

			if (!isAlready) {
				/* #swagger.responses[409] = {
					description: "Already!",
					schema: { $statusCode : 409 ,$status: true, $message: "Lawfirm already exist!", $data : {}}
				} */
				res.send({
					status: 409,
					msg: 'Lawfirm already exist',
				});
			} else {
				console.log('lawFirm--->'+JSON.stringify(inserted));
				// Register lawyer
				const lawFirmFormData = {
					en_name: inserted.en_name,
					ar_name: inserted.ar_name,
					licenseNumber: inserted.licenseNumber,
					countryId: inserted.countryId[0],
					countryTitle: inserted.countryTitle[0],
					languageId: inserted.languageId[0],
					languageTitle: inserted.languageTitle[0],
					experience: inserted.experience,
					jurisdiction: inserted.jurisdiction[0],
					expertise: inserted.expertise,
					numOfLawyer: inserted.numOfLawyer,
					rating: inserted.rating,
					logo: inserted.logo,
					images: inserted.images,
					lawFirmId: inserted.id,
					isActive: inserted.isActive,
					isDeleted: inserted.isDeleted,
				};

				const lawyer = await Lawyer.create(lawFirmFormData);
				const password = generatePassword();
				const user = await User.create({
					fullname: inserted.en_name,
					email: inserted.email,
					role: UserRole.LAWFIRM_ADMIN,
					username: inserted.email,
					password: bcrypt.hashSync(password, 8),
					userType: 'normal',
					lawyer_id: lawyer.id,
					lawfirmid: inserted.id,
					isActive: req.body.isActive,
				});
				await Mail.lawyerRegistration(inserted.email, password);

				await Lawyer.update({user_id: user.id}, {where: {id: lawyer.id}});
				const lawFirmData = {
					id: inserted.id,
					en_name: inserted.en_name,
					ar_name: inserted.ar_name,
					licenseNumber: inserted.licenseNumber,
					countryId: inserted.countryId,
					countryTitle: inserted.countryTitle,
					languageId: inserted.languageId,
					languageTitle: inserted.languageTitle,
					logo: inserted.logo,
					images: inserted.images,
					experience: inserted.experience,
					jurisdiction: inserted.jurisdiction,
					expertise: inserted.expertise,
					numOfLawyer: inserted.numOfLawyer,
					rating: inserted.rating,
					isActive: inserted.isActive,
					isDeleted: inserted.isDeleted,
				};
				// return res.status(200).send({ status:'200', message: "success!" , $data: lawfirmdata });
				return apiResponses.successResponseWithData(
					res,
					'success!',
					lawFirmData,
				);
			}
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.lawFirmUpdate = async (req, res) => {
	// #swagger.tags = ['LawFirm']
	/*  #swagger.parameters['obj'] = {
		in: 'body',
		 description: "LawFirm details for add - en_name, ar_name,licenseNumber,countryId,countryTitle,langaugeId,langaugeTitle,logo,images,experience,price,currency,numOfLawyer,jurisdiction,expertise,rating,taxType,tax, isActive",
			schema: { $en_name: "", $ar_name: "" ,  $isActive: "", $licenseNumber: "" , $countryId: "" ,$countryTitle:"", $langaugeId: "",$logo: "",$images:"",$price: "" ,$currency: "", $rating: "" , $experience: "",$taxType:"",$tax:"", $numOfLawyer: "", $jurisdiction: "", $expertise: ""}
            } */

	try {
		await LawFirm.update(
			{
				id: req.body.id,
				en_name: req.body.en_name,
				ar_name: req.body.ar_name,
				licenseNumber: req.body.licenseNumber,
				countryId: req.body.countryId,
				countryTitle: req.body.countryTitle,
				languageId: req.body.languageId,
				languageTitle: req.body.languageTitle,
				expertise: req.body.expertise,
				numOfLawyer: req.body.numOfLawyer,
				jurisdiction: req.body.jurisdiction,
				rating: req.body.rating,
				experience: req.body.experience,
				logo: req.body.logo,
				images: req.body.images,
				isActive: req.body.isActive,
			},
			{where: {id: req.body.id}},
		)
			.then((lawFirm) => {
				if (!lawFirm) {
					/* #swagger.responses[404] = {
                               description: "Lawfirm Not found.",
                               schema: { $statusCode: "404",  $status: false, $message: "Not found.",  $data: {}}
                           } */
					// return res.status(404).send({ message: "Not found." });
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				/* #swagger.responses[200] = {
                            description: "success!",
                           schema: { $en_name: "en_name", $ar_name: "ar_name" ,  $isActive: "0", $licenseNumber: "licenseNumber" , $countryId: "countryId" ,$countryTitle:"countryTitle", $langaugeId: "langaugeId",$langaugeTitle:"langaugeTitle",$logo: "logo",$images:"images", $rating: "rating" , $experience: "experience", $numOfLawyer: "numOfLawyer", $jurisdiction: "jurisdiction", $expertise: "expertise",$taxtype:"taxType",$tax:"tax"}

                        } */
				// return res.status(200).send({ status:'200', message: "success!" , data: lawFirm });
				return apiResponses.successResponseWithData(res, 'Success', lawFirm);
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

module.exports.getLawFirms = (req, res) => {
	// Get Lawfirm data from Database
	// #swagger.tags = ['LawFirm']

	const limit = req.params.limit;

	LawFirm.findAll({
		include: [
			{
				model: LawFirmService,
			},

			{
				model: LawFirmIndustry,
			},
		],
		limit: limit,
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
				message: err.message || 'Some error occurred while retrieving Lawfirm.',
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

module.exports.getLawFirm = (req, res) => {
	// Get Country from Database
	// #swagger.tags = ['LawFirm']
	LawFirm.findOne({
		where: {id: req.params.id, isDeleted: 0},
		include: [
			{
				model: LawFirmService,
				as: 'lawfirm_services',
				where: {title: {[Op.in]: req.body.serviceSubcategoryName}},
			},

			{
				model: LawFirmIndustry,
			},
		],
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

module.exports.deleteLawFirm = async (req, res) => {
	// #swagger.tags = ['LawFirm']
	try {
		await LawFirm.update(
			{
				isDeleted: 1,
			},
			{where: {id: req.params.id}},
		)
			.then((lawFirm) => {
				if (!lawFirm) {
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
				return apiResponses.successResponseWithData(res, 'Success', lawFirm);
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

module.exports.getlawFirmsDetails = async (req, res) => {
	try {
		LawFirm.findAll({
			include: [
				{
					model: LawFirmService,
				},

				{
					model: LawFirmIndustry,
				},

				{
					model: LawFirmTax,
				},
			],
			order: [['createdAt', 'DESC']],
		}).then((lawfirms) => {
			return apiResponses.successResponseWithData(res, 'Success', lawfirms);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getlawFirmDetails = async (req, res) => {
	const lawFirmId = req.params.lawFirmId;
	try {
		LawFirm.findOne({
			where: {id: lawFirmId},
			include: [
				{
					model: LawFirmService,
				},
				{
					model: LawFirmIndustry,
				},
				{
					model: LawFirmTax,
				},
			],
		}).then((lawfirms) => {
			return apiResponses.successResponseWithData(res, 'Success', lawfirms);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.lawFirmeWorkflowStatus = async (req, res) => {
	try {
		await LawFirm.update(
			{
				workflow: req.params.workflow,
			},
			{where: {id: req.params.lawFirmId}},
		)
			.then((lawFirm) => {
				if (!lawFirm) {
					/* #swagger.responses[404] = {
                               description: "Lawfirm Not found.",
                               schema: { $statusCode: "404",  $status: false, $message: "Not found.",  $data: {}}
                           } */
					// return res.status(404).send({ message: "Not found." });
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				/* #swagger.responses[200] = {
                            description: "success!",
                           schema: { $en_name: "en_name", $ar_name: "ar_name" ,  $isActive: "0", $licenseNumber: "licenseNumber" , $countryId: "countryId" ,$countryTitle:"countryTitle", $langaugeId: "langaugeId",$langaugeTitle:"langaugeTitle",$logo: "logo",$images:"images", $rating: "rating" , $experience: "experience", $numOfLawyer: "numOfLawyer", $jurisdiction: "jurisdiction", $expertise: "expertise",$taxtype:"taxType",$tax:"tax"}

                        } */
				// return res.status(200).send({ status:'200', message: "success!" , data: lawFirm });
				return apiResponses.successResponseWithData(res, 'Success', lawFirm);
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
		console.log('errrrrr', err);
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getFilterlawFirmsDetails = async (req, res) => {
	try {
		const limit = 1000;
		console.log('dsaaaaaaaaaaaaaaaaaaaaaaa', req.body);
		LawFirm.findAll({
			where: {
				[Op.or]: [
					{languageId: {[Op.contains]: req.body.languageId}},
					{countryId: {[Op.contains]: req.body.countryId}},
					{jurisdiction: {[Op.contains]: req.body.jurisdiction}},
				],
			},
			include: [
				{
					model: LawFirmService,
					as: 'lawfirm_services',
					where: {title: {[Op.in]: req.body.services}},
				},
				{
					model: LawFirmIndustry,
				},
				{
					model: LawFirmTax,
				},
			],
			limit: limit,
			order: [['createdAt', 'DESC']],
		  }).then((lawfirms) => {
			return apiResponses.successResponseWithData(res, 'Success', lawfirms);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};
