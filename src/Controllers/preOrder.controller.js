const db = require('../models');
const PreOrder = db.preOrder;
const Request = db.request;
const apiResponses = require('../Components/apiresponse');

module.exports.addPreOrder = async (req, res) => {
	console.log('sfdfgdg', req.body);
	try {
		PreOrder.create({
			appointmentId: req.body.appointmentId,
			queryId: req.body.queryId,
			topic: req.body.topic,
			furtherInformation: req.body.furtherInformation,
			document: req.body.document,
		}).then((preOrder) => {
			if (preOrder) {
				Request.update(
					{
						getstarted: req.body.topic,
					},
					{
						where: {id: req.body.queryId},
					},
				).then((request) => {
					if (!request) {
						return apiResponses.notFoundResponse(res, 'Not found.', {});
					}
				});
			}

			return apiResponses.successResponseWithData(res, 'success!', preOrder);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.updatePreOrder = async (req, res) => {
	try {
		await PreOrder.update(
			{
				topic: req.body.topic,
				furtherInformation: req.body.furtherInformation,
				document: req.body.document,
			},
			{where: {id: req.body.id}},
		)
			.then((preOrder) => {
				if (!preOrder) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				return apiResponses.successResponseWithData(res, 'Success', preOrder);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getPreOrders = (req, res) => {
	PreOrder.findAll({order: [['createdAt', 'DESC']]})
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

module.exports.getPreOrder = (req, res) => {
	PreOrder.findOne({
		where: {queryId: req.params.queryId},
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
