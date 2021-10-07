const db = require('../models');
const LawFirm = db.lawFirm;
const apiResponses = require('../Components/apiresponse');
const Op = db.Sequelize.Op;

module.exports.addLawFirm = async (req, res) => {
	try {
		// #swagger.tags = ['LawFirm']
		console.log(req.body.en_name);
		/*  #swagger.parameters['obj'] = {
			          in: 'body',
			          description: "LawFirm details for add - en_name, ar_name,licenseNumber,countryId,countryTitle,langaugeId,langaugeTitle,logo,images,experience,industryId,industryTitle,price,currency,numOfLawyer,jurisdiction,,serviceId,serviceTitle,subCategoryId,subCategoryTitle,expertise,rating, isActive",
			          schema: { $en_name: "", $ar_name: "" ,  $isActive: "", $licenseNumber: "" , $countryId: "" ,$countryTitle:"", $langaugeId: "",$langaugeTitle:"",$industryTitle:"",$industryId:"",$logo: "",$images:"" ,$price: "" ,$currency: "",$serviceId:"",$serviceTitle:"",$subCategoryTitle:"",$subCategoryId:"", $rating: "" , $experience: "",$numOfLawyer: "", $expertise: "",$jurisdiction:""}
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
				licenseNumber: req.body.licenseNumber,
				countryId: req.body.countryId,
				countryTitle: req.body.countryTitle,
				languageId: req.body.languageId,
				languageTitle: req.body.languageTitle,
				logo: req.body.logo,
				images: req.body.images,
				price: req.body.price,
				currency: req.body.currency,
				expertise: req.body.expertise,
				numOfLawyer: req.body.numOfLawyer,
				jurisdiction: req.body.jurisdiction,
				serviceId: req.body.serviceId,
				serviceTitle: req.body.serviceTitle,
				subCategoryId: req.body.subCategoryId,
				subCategoryTitle: req.body.subCategoryId,
				rating: req.body.rating,
				industryId: req.body.industryId,
				industryTitle: req.body.industryTitle,
				experience: req.body.experience,
				isActive: req.body.isActive,
			},
		}).then((lawFirm) => {
			console.log('lawFirm--->', lawFirm);
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
					price: inserted.price,
					currency: inserted.currency,
					experience: inserted.experience,
					jurisdiction: inserted.jurisdiction,
					serviceId: inserted.serviceId,
					serviceTitle: inserted.serviceTitle,
					subCategoryId: inserted.subCategoryId,
					subCategoryTitle: inserted.subCategoryTitle,
					expertise: inserted.expertise,
					industryId: inserted.industryId,
					industryTitle: inserted.industryTitle,
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
		 description: "LawFirm details for add - en_name, ar_name,licenseNumber,countryId,countryTitle,langaugeId,langaugeTitle,logo,images,experience,industryId,industryTitle,price,currency,numOfLawyer,jurisdiction,,serviceId,serviceTitle,subCategoryId,subCategoryTitle,expertise,rating, isActive",
			schema: { $en_name: "", $ar_name: "" ,  $isActive: "", $licenseNumber: "" , $countryId: "" ,$countryTitle:"", $langaugeId: "",$langaugeTitle:"",$industryTitle:"",$industryId:"",$logo: "",$images:"",$price: "" ,$currency: "",$serviceId:"",$serviceTitle:"",$subCategoryTitle:"",$subCategoryId:"", $rating: "" , $experience: "", $numOfLawyer: "", $jurisdiction: "", $expertise: ""}
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
				logo: req.body.logo,
				images: req.body.images,
				price: req.body.price,
				currency: req.body.currency,
				expertise: req.body.expertise,
				numOfLawyer: req.body.numOfLawyer,
				jurisdiction: req.body.jurisdiction,
				serviceId: req.body.serviceId,
				serviceTitle: req.body.serviceTitle,
				subCategoryId: req.body.subCategoryId,
				subCategoryTitle: req.body.subCategoryTitle,
				rating: req.body.rating,
				industryId: req.body.industryId,
				industryTitle: req.body.industryTitle,
				experience: req.body.experience,
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
                           schema: { $en_name: "en_name", $ar_name: "ar_name" ,  $isActive: "0", $licenseNumber: "licenseNumber" , $countryId: "countryId" ,$countryTitle:"countryTitle", $langaugeId: "langaugeId",$langaugeTitle:"langaugeTitle",$industryTitle:"industryTitle",$industryId:"industryId",$logo: "logo",$images:"images",$price: "price",$currency: "currency",$serviceId:"serviceId",$serviceTitle:"serviceTitle",$subCategoryTitle:"subCategoryTitle",$subCategoryId:"subCategoryId", $rating: "rating" , $experience: "experience", $numOfLawyer: "numOfLawyer", $jurisdiction: "jurisdiction", $expertise: "expertise"}

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
	const search = req.params.searchText;

	if (!!search) {
		LawFirm.findAndCountAll({
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
            err.message || 'Some error occurred while retrieving Lawfirm.',
				});
			});
	} else {
		LawFirm.findAndCountAll({
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

module.exports.getLawFirm = (req, res) => {
	// Get Country from Database
	// #swagger.tags = ['LawFirm']
	LawFirm.findOne({
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
