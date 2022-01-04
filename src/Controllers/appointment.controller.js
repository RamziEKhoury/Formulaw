const db = require('../models');
const Appointment = db.appointment;
const Request = db.request;
const Room = db.room;
const LawFirm = db.lawFirm;
const Lawyer = db.lawyer;
const Admin = db.adminUser;
const User = db.user;
const apiResponses = require('../Components/apiresponse');
const Mail = require('../Config/Mails');
const Op = db.Sequelize.Op;
const moment = require('moment');
const Notifications = require('../Config/Notifications');
const {WorkflowAppointment} = require('../enum');
const _ = require('lodash');
const schedule = require('node-schedule');


module.exports.addAppointment = async (req, res) => {
	try {
		// #swagger.tags = ['Appointment']
		/*  #swagger.parameters['obj'] = {
                    in: 'body',
                    description: "Appointment details for add - queryId, adminId, customerId, shift, date, time",
                    schema: { $queryId: "", $adminId: "", $customerId: "", $shift: "", $date: "", $time: ""}
            } */
		const orderId = Math.floor(Math.random() * (999 - 100 + 1) + 100);
		Appointment.create({
			queryId: req.body.queryId,
			lawFirmId: req.body.lawFirmId,
			adminId: req.body.adminId,
			customerId: req.body.customerId,
			shift: req.body.shift,
			date: req.body.date,
			time: req.body.time,
			endTime: req.body.endTime,
			orderId: orderId,
			scheduleAt: req.body.scheduleAt,
		}).then(async (appointment) => {
			await Room.create({
				appointmentId: appointment.id,
				roomName: appointment.id,
				adminId: appointment.adminId,
				customerId: appointment.customerId,
				queryId: appointment.queryId,
			});
			const appointmentData = {
				id: appointment.id,
				queryId: appointment.queryId,
				adminId: appointment.adminId,
				customerId: appointment.customerId,
				shifts: appointment.shifts,
				date: appointment.date,
				time: appointment.time,
				orderId: appointment.orderId,
			};


			const device = await User.findOne({where: {id: req.body.customerId}});
			const notiData = {
				title: 'Appointment',
				message: 'Your appointment have scheduled on '+moment(appointment.date).format('DD/MM/YYYY')+' at '+ moment(appointment.time).format('HH:mm') +'.',
				senderName: (device.firstname ? device.firstname: " " ) + " " + (device.lastname ? device.lastname : " " ),
				senderId: req.body.customerId,
				senderType: 'APPOINTMENT',
				receiverid: req.body.customerId,
				notificationType: WorkflowAppointment.SCHEDULE_LEAD,
				target: appointment.id,
			};
			await Notifications.notificationCreate(notiData);
			if (!!device.deviceToken) {
				await Notifications.notification(device.deviceToken, 'Your appointment have scheduled on ' + moment(appointment.date).format('DD/MM/YYYY') + ' at ' + moment(appointment.time).format('HH:mm') + '.');
			}

			return apiResponses.successResponseWithData(
				res,
				'appointment registered successfully!',
				appointmentData,
			);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.addBulkAppointment = async (req, res) => {
	try {
		Appointment.bulkCreate(req.body)
			.then(async (scheduleCall) => {
				scheduleCall.map(async (schedule)=>{
					await Room.create({
						appointmentId: schedule.id,
						roomName: schedule.id,
						adminId: schedule.adminId,
						customerId: schedule.customerId,
						queryId: schedule.queryId,
					});
					const userMail = await User.findOne({
						where: {
							id: schedule.customerId,
						},
					});
					await Mail.userSubscriptionmail(
						userMail.email,
						(userMail.firstname ? userMail.firstname : " ") + " " + (userMail.lastname ? userMail.lastname : " "),
						schedule.customerId,
						schedule.orderId,
					);


					const adminMail = await Admin.findOne({
						where: {
							id: schedule.adminId,
						},
					});
					await Mail.adminSubscriptionmail(
						adminMail.email,
						adminMail.firstname,
						(userMail.firstname ? userMail.firstname : " ") + " " + (userMail.lastname ? userMail.lastname : " "),
					);
				});

				if (!scheduleCall) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}


				return apiResponses.successResponseWithData(
					res,
					'Success!',
					scheduleCall,
				);
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};


module.exports.changeStatus = async (req, res) => {
	// #swagger.tags = ['Appointment']
	/*  #swagger.parameters['obj'] = {
                            in: 'body',
                            description: "Country details for add - status",
                            schema: { $status: ""}
                    } */
	try {
		await Appointment.update(
			{
				status: req.body.status,
			},
			{where: {id: req.params.id}},
		)
			.then(async (appointment) => {
				/* #swagger.responses[200] = {
                            description: "success!",
                            schema: { $en_name: "en_name", $ar_name: "en_name", $description: "description", $isActive: 0, $isDeleted: 1, $countryCode: "countryCode",$taxType:"taxType",$tax:"tax", $flag: "flag"}
                        } */
				// return res.status(200).send({ status:'200', message: "success!" , data: appointment });
				if (req.body.status === WorkflowAppointment.FREE_CONSULTATION) {
					const user = await Appointment.findOne({
						where: {id: req.params.id},
						include: [
							{
								model: User,
								required: false,
								attributes: ['firstname','lastname', 'email', 'id'],
							},
							{
								model: Admin,
								required: false,
								attributes: ['firstname', 'lastname', 'email'],
							},
							{
								model: Request,
								required: false,

								attributes: ['getstarted'],
							},
							{
								model: LawFirm,
								required: false,
								attributes: ['en_name'],
							},

						],
					});

					await Mail.adminAppointmentSchedule(
						user.adminuser.email,
						user.adminuser.firstname,
						user.time,
						user.date,
						(user.user.firstname ? user.user.firstname : " ") + " " + (user.user.lastname ? user.user.lastname : " ") ,
						user.query.getstarted,
					);

					const device = await User.findOne({where: {id: user.customerId}});
					const notiData = {
						title: 'Appointment',
						message: 'Hi, Your appointment call is approved for free consultation, Please be ready on ' + moment(user.date).format('DD/MM/YYYY') +
							' time ' + user.time +
							' we will connect with you soon.',
						senderName: (device.firstname ? device.firstname: " " ) + " " + (device.lastname ? device.lastname : " " ),
						senderId: user.customerId,
						senderType: 'APPOINTMENT',
						receiverid: user.customerId,
						notificationType: WorkflowAppointment.FREE_CONSULTATION,
						target: req.params.id,
					};
					await Notifications.notificationCreate(notiData);
					if (!!device.deviceToken) {
						await Notifications.notification(device.deviceToken, 'Hi, Your appointment call is approved for free consultation, Please be ready on ' + moment(user.date).format('DD/MM/YYYY') +
							' time ' + moment(user.time).format('HH:mm') +
							' we will connect with you soon.');
					}

					await Mail.userAppointmentSchedule(
						user.user.email,
						(user.user.firstname ? user.user.firstname : " ") + " " + (user.user.lastname ? user.user.lastname : " "),
						user.time,
						user.date,
						user.user.id,
						user.adminuser.firstname,
						user.orderId,
						user.lawfirm.en_name,
					);

					// reminder message


					const minutesToAdd=15;
					const currenttime = new Date(user.time);
					const futureDate = new Date(currenttime.getTime() - minutesToAdd*60000);
					const someDate = futureDate;

					schedule.scheduleJob(someDate, async () => {
						await Mail.userRemindermail(
							user.user.email,
							(user.user.firstname ? user.user.firstname : " ") + " " + (user.user.lastname ? user.user.lastname : " "),
							user.time,
							user.date,
							user.user.id,
							user.adminuser.firstname,
							user.orderId,
							user.lawfirm.en_name,
						);
						await Mail.adminRemindermail(
							user.adminuser.email,
							user.adminuser.firstname,
							user.time,
							user.date,
							(user.user.firstname ? user.user.firstname : " ") + " " + (user.user.lastname ? user.user.lastname : " "),
							user.query.getstarted,
						);
					});


					await Appointment.update(
						{
							status: req.body.status,
							workflow: req.body.status,
						},
						{where: {id: req.params.id}},
					);
					return apiResponses.successResponseWithData(
						res,
						'Success',
						appointment,
					);
				} else if (req.body.status === WorkflowAppointment.APPROVE_LEAD) {
					const user = await Appointment.findOne({
						where: {id: req.params.id},
						include: [
							{
								model: User,
								required: false,
								attributes: ['firstname', 'lastname', 'email'],
							},
							{
								model: Admin,
								required: false,
								attributes: ['firstname', 'lastname', 'email'],
							},
						],
					});

					const device = await User.findOne({where: {id: user.customerId}});
					const notiData = {
						title: 'Appointment',
						message: 'Hi, Your appointment  is approved now For Next Process',
						senderName: (device.firstname ? device.firstname: " " ) + " " + (device.lastname ? device.lastname : " " ),
						senderId: user.customerId,
						senderType: 'APPOINTMENT',
						receiverid: user.customerId,
						notificationType: WorkflowAppointment.APPROVE_LEAD,
						target: req.params.id,
					};
					await Notifications.notificationCreate(notiData);
					if (!!device.deviceToken) {
						await Notifications.notification(device.deviceToken, 'Hi, Your appointment  is approved now For Next Process');
					}
					await Mail.adminAppointmentApproved(
						user.adminuser.email,
						user.time,
						user.date,
						(user.user.firstname ? user.user.firstname : " ") + " " + (user.user.lastname ? user.user.lastname : " ")
					);

					await Mail.userAppointmentApproved(
						user.user.email,
						user.time,
						user.date,
					);

					await Appointment.update(
						{
							status: req.body.status,
							workflow: req.body.status,
						},
						{where: {id: req.params.id}},
					);

					return apiResponses.successResponseWithData(
						res,
						'Success',
						appointment,
					);
				} else if (req.body.status === WorkflowAppointment.PAYMENT) {
					const user = await Appointment.findOne({
						where: {id: req.params.id},
						include: [
							{
								model: User,
								required: false,
								attributes: ['firstname', 'lastname', 'email'],
							},
							{
								model: Admin,
								required: false,
								attributes: ['firstname', 'lastname', 'email'],
							},
						],
					});

					const device = await User.findOne({where: {id: user.customerId}});
					const notiData = {
						title: 'Appointment',
						message: 'Hi, Your appointment payment is done for the next Process',
						senderName: (device.firstname ? device.firstname: " " ) + " " + (device.lastname ? device.lastname : " " ),
						senderId: user.customerId,
						senderType: 'APPOINTMENT',
						receiverid: user.customerId,
						notificationType: WorkflowAppointment.PAYMENT,
						target: req.params.id,
					};
					await Notifications.notificationCreate(notiData);
					if (!!device.deviceToken) {
						await Notifications.notification(device.deviceToken, 'Hi, Your appointment payment is done for the next Process');
					}

					await Mail.adminAppointmentPayment(
						user.adminuser.email,
						user.time,
						user.date,
						(user.user.firstname ? user.user.firstname : " ") + " " + (user.user.lastname ? user.user.lastname : " ")
					);

					await Mail.userAppointmentPayment(
						user.user.email,
						user.time,
						user.date,
					);

					await Appointment.update(
						{
							status: req.body.status,
							workflow: req.body.status,
						},
						{where: {id: req.params.id}},
					);

					return apiResponses.successResponseWithData(
						res,
						'Success',
						appointment,
					);
				} else if (req.body.status === WorkflowAppointment.CONSULTATION) {
					const user = await Appointment.findOne({
						where: {id: req.params.id},
						include: [
							{
								model: User,
								required: false,
								attributes: ['firstname', 'lastname', 'email', 'id'],
							},
							{
								model: Admin,
								required: false,
								attributes: ['firstname', 'lastname', 'email'],
							},


							{
								model: Lawyer,
								required: false,
								attributes: ['en_name', 'email'],
							},

							{
								model: LawFirm,
								required: false,
								attributes: ['en_name'],
							},


						],
					});

					const device = await User.findOne({where: {id: user.customerId}});
					const notiData = {
						title: 'Appointment',
						message: 'Hi, Your appointment have scheduled for consultation with lawyer',
						senderName: (device.firstname ? device.firstname: " " ) + " " + (device.lastname ? device.lastname : " " ),
						senderId: user.customerId,
						senderType: 'APPOINTMENT',
						receiverid: user.customerId,
						notificationType: WorkflowAppointment.CONSULTATION,
						target: req.params.id,
					};
					await Notifications.notificationCreate(notiData);
					if (!!device.deviceToken) {
						await Notifications.notification(device.deviceToken, 'Hi, Your appointment have scheduled for consultation with lawyer');
					}

					await Appointment.update(
						{
							status: req.body.status,
							workflow: req.body.status,
						},
						{where: {id: req.params.id}},
					);

					const lawFirm = await LawFirm.findOne({where: {id: user.lawFirmId}});
					const lawyers = await User.findAll({where: {lawfirmid: user.lawFirmId}, order: [['createdAt', 'ASC']]});
					if (lawyers.length === 1) {
						const lawyer = _.get(lawyers, [0], null);
						await Appointment.update({lawyerId: lawyer.id}, {where: {id: req.params.id}});
						await LawFirm.update({assignlawyer: lawFirm.assignlawyer+1}, {where: {id: lawFirm.id}});
						const userdetail = await User.findOne({
							where: {id: lawyer.id},
						});

						await Mail.adminAppointmentConsult(
							user.adminuser.email,
							user.time,
							user.date,
							user.adminuser.firstname,
							(user.user.lastname? user.user.firstname : "" ) + " " + (user.user.lastname? user.user.lastname : "" ),
							(userdetail.firstname ?userdetail?.firstname : " ") + " " + (userdetail.lastname ?userdetail?.lastname : " ") ,
							user.lawfirm.en_name,
						);

						await Mail.userAppointmentConsult(
							user.user.email,
							(user.user.firstname ? user.user.firstname : " ") + " " + (user.user.lastname ? user.user.lastname : " "),
							user.time,
							user.date,
							(userdetail.firstname ?userdetail?.firstname : " ") + " " + (userdetail.lastname ?userdetail?.lastname : " ") ,
							user.lawfirm.en_name,
							user.orderId,
							user.user.id,
						);


						await Mail.lawyerAppointmentConsult(
							(userdetail.firstname ?userdetail?.firstname : " ") + " " + (userdetail.lastname ?userdetail?.lastname : " ") ,
							userdetail.email,
							(user.user.firstname ? user.user.firstname : " ") + " " + (user.user.lastname ? user.user.lastname : " "),
							user.adminuser.firstname,
						);

						return apiResponses.successResponseWithData(
							res,
							'Success',
							appointment,
						);
					}
					if (lawyers.length > 1) {
						if (lawyers.length > lawFirm.assignlawyer) {
							const lawyer = _.get(lawyers, [lawFirm.assignlawyer], null);
							await Appointment.update({lawyerId: lawyer.id}, {where: {id: req.params.id}});
							await LawFirm.update({assignlawyer: lawFirm.assignlawyer+1}, {where: {id: lawFirm.id}});
							const userdetail = await User.findOne({
								where: {id: lawyer.id},
							});


							await Mail.adminAppointmentConsult(
								user.adminuser.email,
								user.time,
								user.date,
								user.adminuser.firstname,
								(user.user.firstname ? user.user.firstname : " ") + " " + (user.user.lastname ? user.user.lastname : " "),
								(userdetail.firstname ?userdetail?.firstname : " ") + " " + (userdetail.lastname ?userdetail?.lastname : " ") ,
								user.lawfirm.en_name,
							);

							await Mail.userAppointmentConsult(
								user.user.email,
								(user.user.firstname ? user.user.firstname : " ") + " " + (user.user.lastname ? user.user.lastname : " "),
								user.time,
								user.date,
								(userdetail.firstname ?userdetail?.firstname : " ") + " " + (userdetail.lastname ?userdetail?.lastname : " ") ,
								user.lawfirm.en_name,
								user.orderId,
								user.user.id,


							);
							await Mail.lawyerAppointmentConsult(
								(userdetail.firstname ?userdetail?.firstname : " ") + " " + (userdetail.lastname ?userdetail?.lastname : " ") ,
								userdetail.email,
								(user.user.firstname ? user.user.firstname : " ") + " " + (user.user.lastname ? user.user.lastname : " "),
								user.adminuser.firstname,
							);
							return apiResponses.successResponseWithData(
								res,
								'Success',
								appointment,
							);
						} else {
							const lawyer = _.get(lawyers, [0], null);
							await Appointment.update({lawyerId: lawyer.id}, {where: {id: req.params.id}});
							await LawFirm.update({assignlawyer: lawFirm.assignlawyer+1}, {where: {id: lawFirm.id}});
							const userdetail = await User.findOne({
								where: {id: lawyer.id},
							});

							await Mail.adminAppointmentConsult(
								user.adminuser.email,
								user.time,
								user.date,
								user.adminuser.firstname,
								(user.user.firstname ? user.user.firstname : " ") + " " + (user.user.lastname ? user.user.lastname : " "),
								(userdetail.firstname ?userdetail?.firstname : " ") + " " + (userdetail.lastname ?userdetail?.lastname : " ") ,
								user.lawfirm.en_name,
							);

							await Mail.userAppointmentConsult(
								user.user.email,
								(user.user.firstname ? user.user.firstname : " ") + " " + (user.user.lastname ? user.user.lastname : " "),
								user.time,
								user.date,
								(userdetail.firstname ?userdetail?.firstname : " ") + " " + (userdetail.lastname ?userdetail?.lastname : " ") ,
								user.lawfirm.en_name,
								user.orderId,
								user.user.id,


							);


							await Mail.lawyerAppointmentConsult(
								(userdetail.firstname ?userdetail?.firstname : " ") + " " + (userdetail.lastname ?userdetail?.lastname : " ") ,
								userdetail.email,
								(user.user.firstname ? user.user.firstname : " ") + " " + (user.user.lastname ? user.user.lastname : " "),
								user.adminuser.firstname,
							);


							return apiResponses.successResponseWithData(
								res,
								'Success',
								appointment,
							);
						}
					}


					return apiResponses.successResponseWithData(
						res,
						'Success',
						appointment,
					);
				} else if (req.body.status === WorkflowAppointment.COMPLETED) {
					const user = await Appointment.findOne({
						where: {id: req.params.id},
						include: [
							{
								model: User,
								required: false,
								attributes: ['firstname', 'lastname', 'email'],
							},
							{
								model: Admin,
								required: false,
								attributes: ['firstname', 'lastname', 'email'],
							},
						],
					});

					const device = await User.findOne({where: {id: user.customerId}});
					const notiData = {
						title: 'Appointment',
						message: 'Hi, Your appointment has been completed',
						senderName: (device.firstname ? device.firstname: " " ) + " " + (device.lastname ? device.lastname : " " ),
						senderId: user.customerId,
						senderType: 'APPOINTMENT',
						receiverid: user.customerId,
						notificationType: WorkflowAppointment.COMPLETED,
						target: req.params.id,
					};
					await Notifications.notificationCreate(notiData);
					if (!!device.deviceToken) {
						await Notifications.notification(device.deviceToken, 'Hi, Your appointment has been completed');
					}

					await Mail.adminAppointmentComplete(
						user.adminuser.email,
						user.time,
						user.date,
						(user.user.firstname ? user.user.firstname : " ") + " " + (user.user.lastname ? user.user.lastname : " ")
					);

					await Mail.userAppointmentComplete(
						user.user.email,
						user.time,
						user.date,
					);

					await Appointment.update(
						{
							status: req.body.status,
							workflow: req.body.status,
						},
						{where: {id: req.params.id}},
					);

					return apiResponses.successResponseWithData(
						res,
						'Success',
						appointment,
					);
				} else {
					await Appointment.update(
						{
							status: req.body.status,
							workflow: req.body.status,
						},
						{where: {id: req.params.id}},
					);
					return apiResponses.successResponseWithData(
						res,
						'Success',
						appointment,
					);
				}
			})
			.catch((err) => {
				/* #swagger.responses[500] = {
                            description: "Error message",
                            schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                        } */
				// return res.status(500).send({ message: err.message });
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

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
				],
			},
			limit: limit,
			order: [['createdAt', 'DESC']],
		})
			.then((data) => {
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
            err.message || 'Some error occurred while retrieving Appointment.',
				});
			});
	} else {
		Appointment.findAll({
			include: [
				{model: Request, required: false},
				{model: LawFirm, required: false, attributes: ['en_name']},
				{
					model: Admin,
					required: false,
					attributes: ['firstname', 'lastname'],
				},
				{model: User, required: false, attributes: ['firstname', 'lastname', 'email']},

			],
			order: [['createdAt', 'DESC']],
		})
			.then((result) => {
				// res.status(200).send({
				//   status: "200",
				//   user: result,
				// });
				return apiResponses.successResponseWithData(res, 'success', result);
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
	// Get Appointment from Database
	// #swagger.tags = ['Appointment']
	Appointment.findOne({
		where: {id: req.params.id},
		include: [
			{model: Request, required: false},
			{model: LawFirm, required: false, attributes: ['en_name']},
			{model: Admin, required: false, attributes: ['firstname', 'lastname']},
			{model: User, required: false, attributes: ['firstname', 'lastname', 'email']},
		],
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
          err.message || 'Some error occurred while retrieving Appointment.',
			});
		});
};

module.exports.getUserAppointment = (req, res) => {
	// Get Appointment from Database
	// #swagger.tags = ['Appointment']
	Appointment.findAll({
		where: {customerId: req.params.userId},
		include: [
			{model: Request, required: false},
			{model: LawFirm, required: false, attributes: ['en_name']},
			{model: Admin, required: false, attributes: ['firstname', 'lastname']},
			{model: User, required: false, attributes: ['firstname', 'lastname', 'email']},

		],
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
				message:
          err.message || 'Some error occurred while retrieving Appointment.',
			});
		});
};

module.exports.getLawyerAppointment = (req, res) => {
	// Get Appointment from Database
	// #swagger.tags = ['Appointment']
	Appointment.findAll({
		where: {lawFirmId: req.params.lawFirmId},
		include: [
			{model: Request, required: false},
			{model: LawFirm, required: false, attributes: ['en_name']},
			{model: Admin, required: false, attributes: ['firstname', 'lastname']},
			{model: User, required: false, attributes: ['firstname', 'lastname', 'email']},

		],
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
				message:
          err.message || 'Some error occurred while retrieving Appointment.',
			});
		});
};

module.exports.getUserAppointmentMonthly = (req, res) => {
	// Get Appointment from Database
	// #swagger.tags = ['Appointment']
	Appointment.findAll({
		where: {
			customerId: req.params.userId,
			time: {
				[Op.between]: [req.params.startDate, req.params.endDate],
			},
		},
		include: [
			{model: Request, required: false},
			{model: LawFirm, required: false, attributes: ['en_name']},
			{model: Admin, required: false, attributes: ['firstname', 'lastname']},
			{model: User, required: false, attributes: ['firstname', 'lastname', 'email']},

		],
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
				message:
          err.message || 'Some error occurred while retrieving Appointment.',
			});
		});
};

module.exports.getLawyerAppointmentMonthly = (req, res) => {
	// Get Appointment from Database
	// #swagger.tags = ['Appointment']
	Appointment.findAll({
		where: {
			lawyerId: req.params.lawyerId,
			status: WorkflowAppointment.CONSULTATION,
			time: {
				[Op.between]: [req.params.startDate, req.params.endDate],
			},
		},
		include: [
			{model: Request, required: false},
			{model: LawFirm, required: false, attributes: ['en_name']},
			{model: Admin, required: false, attributes: ['firstname', 'lastname']},
			{model: User, required: false, attributes: ['firstname', 'lastname', 'email']},

		],
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
				message:
          err.message || 'Some error occurred while retrieving Appointment.',
			});
		});
};

module.exports.getAppointmentTime = (req, res) => {
	// Get Appointment from Database
	// #swagger.tags = ['Appointment']
	const value = req.query;
	const today = moment(value.date).format('YYYY-MM-DD');
	Appointment.findOne({
		where: {
			shift: value.shift,
			time: value.time,
			date: {[Op.iLike]: '%' + today + '%'},
		},

	})
		.then((responce) => {
			// res.status(200).send({
			//   status: "200",
			//   user: data,
			// });
			if (responce) {
				return apiResponses.successResponseWithData(res, 'success', true);
			}
			return apiResponses.successResponseWithData(res, 'success', false);
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                                description: "Error message",
                                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                            } */
			// return res.status(500).send({ message: err.message });
			res.status(500).send({
				message:
          err.message || 'Some error occurred while retrieving Appointment.',
			});
		});
};


module.exports.getUserLastAppointment = (req, res) => {
	// Get Appointment from Database
	// #swagger.tags = ['Appointment']
	Appointment.findAll({
		where: {customerId: req.params.userId},
	})
		.then((data) => {
			// res.status(200).send({
			//   status: "200",
			//   user: data,
			// });
			if (_.isEmpty(data)) {
				return apiResponses.successResponseWithData(res, 'success', data);
			}
			const lastElement = data[data.length - 1];
			return apiResponses.successResponseWithData(res, 'success', lastElement);
		})
		.catch((err) => {
			/* #swagger.responses[500] = {
                                description: "Error message",
                                schema: { $statusCode: "500",  $status: false, $message: "Error Message", $data: {}}
                            } */
			// return res.status(500).send({ message: err.message });
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving Appointment.',
			});
		});
};

module.exports.getAllAppointmentByDay = (req, res) => {
	const today = moment(req.params.time).format('YYYY-MM-DD');
	Appointment.findAll({
		where: {time: {[Op.iLike]: '%' + today + '%'}},
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
	  err.message || 'Some error occurred while retrieving Appointment.',
			});
		});
};

module.exports.getAllLawyerCases = (req, res) => {
	// Get Appointment from Database
	// #swagger.tags = ['Appointment']
	Appointment.findAll({
		where: {
			lawyerId: req.params.lawyerId,
		},
		include: [
			{model: Request, required: false},
			{model: LawFirm, required: false, attributes: ['en_name']},
			{model: Admin, required: false, attributes: ['firstname', 'lastname']},
			{model: User, required: false, attributes: ['firstname', 'lastname', 'email']},

		],
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
				message:
					err.message || 'Some error occurred while retrieving Appointment.',
			});
		});
};

module.exports.getLawyerOpenCases = (req, res) => {
	// Get Appointment from Database
	// #swagger.tags = ['Appointment']
	Appointment.findAll({
		where: {
			lawyerId: req.params.lawyerId,
			status: WorkflowAppointment.CONSULTATION,
		},
		include: [
			{model: Request, required: false},
			{model: LawFirm, required: false, attributes: ['en_name']},
			{model: Admin, required: false, attributes: ['firstname', 'lastname']},
			{model: User, required: false, attributes: ['firstname', 'lastname', 'email']},

		],
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
				message:
					err.message || 'Some error occurred while retrieving Appointment.',
			});
		});
};


module.exports.getLawyerCompletedCases = (req, res) => {
	// Get Appointment from Database
	// #swagger.tags = ['Appointment']
	Appointment.findAll({
		where: {
			lawyerId: req.params.lawyerId,
			status: WorkflowAppointment.COMPLETED,
		},
		include: [
			{model: Request, required: false},
			{model: LawFirm, required: false, attributes: ['en_name']},
			{model: Admin, required: false, attributes: ['firstname', 'lastname']},
			{model: User, required: false, attributes: ['firstname', 'lastname', 'email']},

		],
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
				message:
					err.message || 'Some error occurred while retrieving Appointment.',
			});
		});
};


module.exports.changesLawyer = (req, res) => {
	// Get Appointment from Database
	// #swagger.tags = ['Appointment']
	Appointment.update(
		{lawyerId: req.params.newLawyerId},
		{where: {id: req.params.lawyerId}})
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
					err.message || 'Some error occurred while retrieving Appointment.',
			});
		});
};

module.exports.RescheduleAppointment = async (req, res) => {
	try {
		await Appointment.update(
			{
				time: req.body.time,
			    endTime: req.body.endTime,
				shift: req.body.shift,
			},
			{where: {id: req.body.id}},
		)
			.then((data) => {
				if (!data) {
					
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}
				
				return apiResponses.successResponseWithData(res, 'Success', data);
			})
			.catch((err) => {
				
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};
