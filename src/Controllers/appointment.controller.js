const db = require('../models');
const Appointment = db.appointment;
const apiResponses = require('../Components/apiresponse');
const Op = db.Sequelize.Op;

module.exports.addAppointment = (async (req, res) => {
	try {
		// #swagger.tags = ['Appointment']
		/*  #swagger.parameters['obj'] = {
                    in: 'body',
                    description: "Appointment details for add - queryId, adminId, customerId, shift, date, time",
                    schema: { $queryId: "", $adminId: "", $customerId: "", $shift: "", $date: "", $time: ""}
            } */
		Appointment.create({

			queryId: req.body.queryId,
			adminId: req.body.adminId,
			customerId: req.body.customerId,
			shifts: req.body.shifts,
			date: req.body.date,
			time: req.body.time,

		})
			.then((appointment) =>{
				const appointmentData = {
					id: appointment.id,
					queryId: appointment.queryId,
					adminId: appointment.adminId,
					customerId: appointment.customerId,
					shifts: appointment.shifts,
					date: appointment.date,
					time: appointment.time,

				};
				return apiResponses.successResponseWithData(
					res,
					'appointment registered successfully!',
					appointmentData,
				);
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
});

module.exports.getAppointments = (req, res) => {
	// Get Appointment from Database
	// #swagger.tags = ['Appointment']
	const limit = req.params.limit;
	const search = req.query.searchText;

	if (!!search) {
		Appointment.findAll({
			where: {
				[Op.or]: [
					{
						adminId: {[Op.like]: `%${search}%`},
					},
					{
						customerId: {[Op.like]: `%${search}%`},
					},
				]},
			limit: limit,
		})
			.then((data) => {
				return apiResponses.successResponseWithData(
					res, 'success', data,
				);
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
	} else {
		Appointment.findAll()
			.then((result) => {
				// res.status(200).send({
				//   status: "200",
				//   user: result,
				// });
				return apiResponses.successResponseWithData(
					res, 'success', result,
				);
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


module.exports.getAppointment = (req, res) => {
	// Get Country from Database
	// #swagger.tags = ['Country']
	Appointment.findOne({
		where: {id: req.params.id},
	})
		.then((data) => {
			// res.status(200).send({
			//   status: "200",
			//   user: data,
			// });

			return apiResponses.successResponseWithData(
				res, 'success', data,
			);
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
					'Some error occurred while retrieving Country.',
			});
		});
};


