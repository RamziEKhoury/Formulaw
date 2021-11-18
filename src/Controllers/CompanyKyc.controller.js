const db = require('../models');
const Companykyc = db.Company_kyc;
const User = db.user;
const apiResponses = require('../Components/apiresponse');

module.exports.addCompanyKycDetails = async (req, res) => {
	console.log("dfdgsgdfh",req.body);
	try {
		Companykyc.create({
				userId: req.body.userId,
				passport: req.body.passport,
                crNumber:req.body.crNumber,
				companyName: req.body.companyName,
				officeAddress: req.body.officeAddress,
                photo:req.body.photo,
				ParmanentAddress: req.body.ParmanentAddress,
				PhnNumber: req.body.PhnNumber,
			}).then((companyKycDetail) => {
				return apiResponses.successResponseWithData(
					res,
					'success!',
					companyKycDetail,
				);
			}
		);
	} catch (err) {
        console.log("errr===========",err);
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.updateCompanyKycDetails = async (req, res) => {
	try {
		await Companykyc.update(
			{
				passport: req.body.passport,
                crNumber:req.body.crNumber,
				companyName: req.body.companyName,
				officeAddress: req.body.officeAddress,
                photo:req.body.photo,
				ParmanentAddress: req.body.ParmanentAddress,
				PhnNumber: req.body.PhnNumber,
			},
			{where: {userId: req.body.userId}},
		)
			.then((companyKycDetail) => {
				if (!companyKycDetail) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', companyKycDetail);
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
			{model: User, required: false, attributes: ['fullname', 'email']},
		],
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
            err.message || 'Some error occurred while retrieving data.',
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
			{model: User, required: false, attributes: ['fullname', 'email']},
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
				return apiResponses.successResponseWithData(res, 'Success', companyKycDetail);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		console.log('errrrrr', err);
		return apiResponses.errorResponse(res, err);
	}
};