const db = require('../models');
const Dispute = db.dispute;
const User = db.user;
const apiResponses = require('../Components/apiresponse');

module.exports.addDispute = async (req, res) => {
	try {
		Dispute.create({
			userId: req.body.userId,
			serviceName: req.body.serviceName,
			orderId: req.body.orderId,
			dispute: req.body.dispute,
			img: req.body.img,
		}).then((dispute) => {
			return apiResponses.successResponseWithData(res, 'success!', dispute);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};



module.exports.getDisputes = (req, res) => {
	Dispute.findAll({
        include: [
            {model: User, required: false, attributes: ['firstname', 'lastname', 'email']},
        ],
        order: [['createdAt', 'DESC']]})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving data.',
			});
		})
};

module.exports.getDispute = (req, res) => {
	Dispute.findOne({
		where: {id: req.params.id},
        include: [
            {model: User, required: false, attributes: ['firstname', 'lastname', 'email']},
        ],
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

module.exports.DisputeStatus = async (req, res) => {
	try {
		await Dispute.update(
			{
				status: req.params.status,
			},
			{where: {id: req.params.id}},
		)
			.then((dispute) => {
				if (!dispute) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', dispute);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};
