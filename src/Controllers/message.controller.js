const db = require('../models');
const Messages = db.message;
const apiResponses = require('../Components/apiresponse');


module.exports.getMessagesWithFile = (req, res) => {
	console.log("dsffs======================",req.params);
	// Get Appointment from Database
	// #swagger.tags = ['Messages']
	Messages.findAll({
		where: {
			receiverId: req.params.userId,
			messageType: 'FILE',
		},
	})
	 .then((data) => {
			return apiResponses.successResponseWithData(
					res, 'success', data,);
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