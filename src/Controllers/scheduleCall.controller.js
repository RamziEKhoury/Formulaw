const db = require('../models');
const ScheduleCall = db.scheduleCall;
const Request = db.request;
const Appointment = db.appointment;
const Room = db.room;
const LawFirm = db.lawFirm;
const Admin = db.adminUser;
const User = db.user;
const apiResponses = require('../Components/apiresponse');
const Mail = require('../Config/Mails');
const Op = db.Sequelize.Op;
const moment = require('moment');
const Notifications = require('../Config/Notifications');

module.exports.addScheduledCalls = async (req, res) => {
	try {
		ScheduleCall.bulkCreate(req.body)
        .then(async (scheduleCall) => {
            scheduleCall.map(async (schedule)=>{
                await Room.create({
                    appointmentId: schedule.id,
                    roomName: schedule.id,
                    adminId: schedule.adminId,
                    customerId: schedule.customerId,
                    queryId: schedule.queryId,
                })})

            if(!scheduleCall){
                return apiResponses.notFoundResponse(res, 'Not found.', {});
            }
            console.log("dfsfsdf",scheduleCall)
            scheduleCall.map((scheduleCal)=>{

                Appointment.update(
                    
                    {
                        scheduleAt: scheduleCal.scheduleAt,
                    },
                    {
                        where: {queryId: scheduleCal.queryId},
                    },
                ).then((appointment) => {
                    console.log("dfsfsdf==============",appointment)
                    if (!appointment) {
                        return apiResponses.notFoundResponse(res, 'Not found.', {});
                    }
                });
            })
			return apiResponses.successResponseWithData(
				res,
				'appointment registered successfully!',
				scheduleCall,
			);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

// module.exports.changeStatus = async (req, res) => {
	
// 	try {
// 		await ScheduleCall.update(
// 			{
// 				status: req.body.status,
// 			},
// 			{where: {id: req.params.id}},
// 		)
// 			.then(async (scheduleCall) => {
// 				if (req.body.status === 'free consultation') {
// 					const user = await scheduleCall.findOne({
// 						where: {id: req.params.id},
// 						include: [
// 							{
// 								model: User,
// 								required: false,
// 								attributes: ['fullname', 'email'],
// 							},
// 							{
// 								model: Admin,
// 								required: false,
// 								attributes: ['firstname', 'lastname', 'email'],
// 							},
// 						],
// 					});
					
// 					await ScheduleCall.update(
// 						{
// 							status: req.body.status,
// 							workflow: req.body.status,
// 						},
// 						{where: {id: req.params.id}},
// 					);
// 					return apiResponses.successResponseWithData(
// 						res,
// 						'Success',
// 						scheduleCall,
// 					);
// 				} else if (req.body.status === 'approved') {
// 					const user = await ScheduleCall.findOne({
// 						where: {id: req.params.id},
// 						include: [
// 							{
// 								model: User,
// 								required: false,
// 								attributes: ['fullname', 'email'],
// 							},
// 							{
// 								model: Admin,
// 								required: false,
// 								attributes: ['firstname', 'lastname', 'email'],
// 							},
// 						],
// 					});

					
// 			.catch((err) => {
// 				/* #swagger.responses[500] = {
//                             description: "Error message",
//                             schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
//                         } */
// 				// return res.status(500).send({ message: err.message });
// 				return apiResponses.errorResponse(res, err.message, {});
// 			});
// 	} catch (err) {
// 		return apiResponses.errorResponse(res, err);
// 	}
// };

module.exports.getAppointments = (req, res) => {
	const limit = req.params.limit;
	const search = req.query.searchText;

	if (!!search) {
		ScheduleCall.findAll({
			where: {
				[Op.or]: [
					{
						adminId: {[Op.like]: `%${search}%`},
					},
					{
						customerId: {[Op.like]: `%${search}%`},
					},
				],
			},
			limit: limit,
		})
			.then((data) => {
				return apiResponses.successResponseWithData(res, 'success', data);
			})
			.catch((err) => {
				res.status(500).send({
					message:
            err.message || 'Some error occurred while retrieving Scheduled Calls.',
				});
			});
	} else {
		ScheduleCall.findAll({
			include: [
				{model: Request, required: false},
				{model: LawFirm, required: false, attributes: ['en_name']},
				{
					model: Admin,
					required: false,
					attributes: ['firstname', 'lastname'],
				},
				{model: User, required: false, attributes: ['fullname', 'email']},
			],
		})
			.then((result) => {
				return apiResponses.successResponseWithData(res, 'success', result);
			})
			.catch((err) => {
				res.status(500).send({
					message: 'Something Went Wrong',
				});
			});
	}
};

module.exports.getAppointment = (req, res) => {
	ScheduleCall.findOne({
		where: {id: req.params.id},
		include: [
			{model: Request, required: false},
			{model: LawFirm, required: false, attributes: ['en_name']},
			{model: Admin, required: false, attributes: ['firstname', 'lastname']},
			{model: User, required: false, attributes: ['fullname', 'email']},
		],
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
          err.message || 'Some error occurred while retrieving Scheduled Call.',
			});
		});
};

module.exports.getUserAppointment = (req, res) => {
	ScheduleCall.findAll({
		where: {customerId: req.params.userId},
		include: [
			{model: Request, required: false},
			{model: LawFirm, required: false, attributes: ['en_name']},
			{model: Admin, required: false, attributes: ['firstname', 'lastname']},
			{model: User, required: false, attributes: ['fullname', 'email']},
		],
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
          err.message || 'Some error occurred while retrieving Appointment.',
			});
		});
};

module.exports.getLawyerAppointment = (req, res) => {
	ScheduleCall.findAll({
		where: {lawFirmId: req.params.lawFirmId},
		include: [
			{model: Request, required: false},
			{model: LawFirm, required: false, attributes: ['en_name']},
			{model: Admin, required: false, attributes: ['firstname', 'lastname']},
			{model: User, required: false, attributes: ['fullname', 'email']},
		],
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
          err.message || 'Some error occurred while retrieving Scheduled Calls.',
			});
		});
};

module.exports.getUserAppointmentMonthly = (req, res) => {
	ScheduleCall.findAll({
		where: {
			customerId: req.params.userId,
			date: {
				[Op.between]: [req.params.startDate, req.params.endDate],
			},
		},
		include: [
			{model: Request, required: false},
			{model: LawFirm, required: false, attributes: ['en_name']},
			{model: Admin, required: false, attributes: ['firstname', 'lastname']},
			{model: User, required: false, attributes: ['fullname', 'email']},
		],
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
          err.message || 'Some error occurred while retrieving Scheduled Calls.',
			});
		});
};

module.exports.getLawyerAppointmentMonthly = (req, res) => {
	ScheduleCall.findAll({
		where: {
			lawFirmId: req.params.lawFirmId,
			date: {
				[Op.between]: [req.params.startDate, req.params.endDate],
			},
		},
		include: [
			{model: Request, required: false},
			{model: LawFirm, required: false, attributes: ['en_name']},
			{model: Admin, required: false, attributes: ['firstname', 'lastname']},
			{model: User, required: false, attributes: ['fullname', 'email']},
		],
	})
		.then((data) => {
			return apiResponses.successResponseWithData(res, 'success', data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
          err.message || 'Some error occurred while retrieving Appointment.',
			});
		});
};

