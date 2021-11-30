const db = require('../models');
const LawFirmTax = db.lawFirm_tax;
const apiResponses = require('../Components/apiresponse');

module.exports.addLawFirmTax = async (req, res) => {
	// get input values from reqeust.
	const taxData = req.body.values;
	console.log(taxData);
	const lawFirmId = req.body.lawFirmId;

	try {
		if (taxData === undefined || taxData === '') {
			res.send({status: 409, msg: 'Tax Data should not be empty.'});
		}
		taxData.map((tax, i) => {
			const taxes = {
				taxType: tax.label,
				countryId: tax.value,
				tax: tax.tax,
				countryTitle: tax.countryTitle,
				lawFirmId: lawFirmId,
			};
			// #swagger.tags = ['LawFirmTax']
			/*  #swagger.parameters['obj'] = {
						  in: 'body',
						  description: "LawFirmTax details for add -lawFirmId,countryId,tax,taxType",
						  schema: {$lawFirmId:"",$taxType:"",$countryId:"",$tax:""}
			} */

			LawFirmTax.create(taxes).then((lawFirmTax) => {});
		});
		return apiResponses.successResponseWithData(res, 'success!');
	} catch (err) {
		console.log('errgdfhjfgjhgk', err);
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getLawFirmTaxes = (req, res) => {
	// console.log("kjngf",req.lawFirmId);
	// Get Lawfirm data from Database
	// #swagger.tags = ['LawFirmTax']

	LawFirmTax.findAll({
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

module.exports.getLawFirmTax = (req, res) => {
	// Get Country from Database
	// #swagger.tags = ['LawFirmTax']
	LawFirmTax.findOne({
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
          err.message || 'Some error occurred while retrieving LawFirmTax.',
			});
		});
};
