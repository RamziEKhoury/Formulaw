const db = require('../models');
const Chat = db.chat;
const Messages = db.message;
const apiResponses = require('../Components/apiresponse');

module.exports.getChatWithMessages = (req, res) => {
	// Get Appointment from Database
	// #swagger.tags = ['Messages']
	Chat.findOne({
		where: {
			senderId: req.body.senderId,
			receiverId: req.body.receiverId,
			requestId: req.body.requestId,
		},
		include: [
			{model: Messages, required: false},
		],
	})
		.then((data) => {
			// res.status(200).send({
			//   status: "200",
			//   user: data,
			// });

			if (!data) {
				Chat.findOne({
					where: {
						senderId: req.body.receiverId,
						receiverId: req.body.senderId,
						requestId: req.body.requestId,
					},
					include: [
						{model: Messages, required: false},
					],
				})
					.then((data) => {
						return apiResponses.successResponseWithData(
							res, 'success', data,
						);
					});
			} else {
				return apiResponses.successResponseWithData(
					res, 'success', data,
				);
			}
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                                description: "Error message",
                                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                            } */
			// return res.status(500).send({ message: err.message });
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while retrieving Appointment.',
			});
		});
};
