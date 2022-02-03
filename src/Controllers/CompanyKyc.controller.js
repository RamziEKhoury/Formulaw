const db = require('../models');
const Companykyc = db.Company_kyc;
const User = db.user;
const apiResponses = require('../Components/apiresponse');

module.exports.addCompanyKycDetails = async (req, res) => {
	try {
		Companykyc.create({
			userId: req.body.userId,
			passport: req.body.passport,
			crNumber: req.body.crNumber,
			companyName: req.body.companyName,
			officeAddress: req.body.officeAddress,
			photo: req.body.photo,
			ParmanentAddress: req.body.ParmanentAddress,
			PhnNumber: req.body.PhnNumber,
			officeaddressone: req.body.officeaddressone,
			officeaddresstwo: req.body.officeaddresstwo,
			officecountry: req.body.officecountry,
			officecity: req.body.officecity,
			officepostalcode: req.body.officepostalcode,
			addressone: req.body.addressone,
			addresstwo: req.body.addresstwo,
			country: req.body.country,
			city: req.body.city,
			postalcode: req.body.postalcode,
			nationality: req.body.nationality,
			passportnumber: req.body.passportnumber,
		}).then((companyKycDetail) => {
			return apiResponses.successResponseWithData(
				res,
				'success!',
				companyKycDetail,
			);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.updateCompanyKycDetails = async (req, res) => {
	try {
		await Companykyc.update(
			{
				passport: req.body.passport,
				crNumber: req.body.crNumber,
				companyName: req.body.companyName,
				officeAddress: req.body.officeAddress,
				photo: req.body.photo,
				ParmanentAddress: req.body.ParmanentAddress,
				PhnNumber: req.body.PhnNumber,
				officeaddressone: req.body.officeaddressone,
				officeaddresstwo: req.body.officeaddresstwo,
				officecountry: req.body.officecountry,
				officecity: req.body.officecity,
				officepostalcode: req.body.officepostalcode,
				addressone: req.body.addressone,
				addresstwo: req.body.addresstwo,
				country: req.body.country,
				city: req.body.city,
				postalcode: req.body.postalcode,
				nationality: req.body.nationality,
			    passportnumber: req.body.passportnumber,
			},
			{where: {userId: req.body.userId}},
		)
			.then((companyKycDetail) => {
				if (!companyKycDetail) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(
					res,
					'Success',
					companyKycDetail,
				);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getallUserCompanyKycDetails = (req, res) => {
	const limit = req.params.limit;
	Companykyc.findAll({
		include: [
			{model: User, required: false, attributes: ['firstname', 'lastname', 'email']},
		],
		order: [['createdAt', 'DESC']],
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving data.',
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Something Went Wrong',
			});
		});
};

module.exports.getOneUserCompanyKycDetails = (req, res) => {
	Companykyc.findOne({
		include: [
			{model: User, required: false, attributes: ['firstname', 'lastname', 'email']},
		],
		where: {userId: req.params.userId},
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving data.',
			});
		});
};

module.exports.CompanykycStatus = async (req, res) => {
	try {
		await Companykyc.update(
			{
				status: req.params.status,
			},
			{where: {userId: req.params.userId}},
		)
			.then((companyKycDetail) => {
				if (!companyKycDetail) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(
					res,
					'Success',
					companyKycDetail,
				);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};
