const db = require('../models');
const Messages = db.message;
const apiResponses = require('../Components/apiresponse');


module.exports.getUserMessagesWithFile = (req, res) => {
	Messages.findAll({
		where: {
			receiverId: req.params.userId,
			messageType: 'FILE',
		},
	})
	 .then((data) => {
			return apiResponses.successResponseWithData(
				res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while retrieving messages.',
			});
		});
};

module.exports.getLawyerMessagesWithFile = (req, res) => {
	Messages.findAll({
		where: {
			receiverId: req.params.lawyerId,
			messageType: 'FILE',
		},
	})
	 .then((data) => {
			return apiResponses.successResponseWithData(
				res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while retrieving messages.',
			});
		});
};


module.exports.getDocument = (req, res) => {
	Messages.findAll({
		where: {
			appointmentId: req.params.id,
			messageType: 'FILE',
		},
	})
	 .then((data) => {
			return apiResponses.successResponseWithData(
				res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while retrieving messages.',
			});
		});
};
