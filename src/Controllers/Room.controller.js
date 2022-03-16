const db = require('../models');
const RoomController = db.room;
const Request = db.request;
const Admin = db.adminUser;
const User = db.user;
const apiResponses = require('../Components/apiresponse');
const {recieverJoinRoomEmail, recieverJoinCallEmailAdmin} = require('../Config/Mails');
const {WorkflowAppointment} = require('../enum');
const Notifications = require('../Config/Notifications');

module.exports.getRooms = async (req, res) => {
	try {
		RoomController.findAll({
			include: [
				{
					model: Admin,
					required: false,
					attributes: ['firstname', 'lastname', 'id'],
				},
				{
					model: Request,
					required: false,
					attributes: ['getstarted'],
				},
				{
					model: User,
					required: false,
					attributes: ['firstname', 'lastname', 'email', 'id'],
				},
			],
			isActive: 1,
			order: [['createdAt', 'DESC']],
		}).then(async (rooms) => {
			return apiResponses.successResponseWithData(res, 'Success!', rooms);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.getRoomById = (req, res) => {
	// Get RoomController from Database
	// #swagger.tags = ['RoomController']
	RoomController.findOne({
		where: {id: req.params.id},
		include: [
			{
				model: Admin,
				required: false,
				attributes: ['firstname', 'lastname', 'id'],
			},
			{
				model: Request,
				required: false,
				attributes: ['getstarted'],
			},
			{
				model: User,
				required: false,
				attributes: ['firstname', 'lastname', 'email', 'id'],
			},
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
          err.message || 'Some error occurred while retrieving RoomController.',
			});
		});
};

module.exports.getRoomByAppointmentId = (req, res) => {
	// Get RoomController from Database
	// #swagger.tags = ['RoomController']
	RoomController.findOne({
		where: {appointmentId: req.params.appointmentId},
		include: [
			{
				model: Admin,
				required: false,
				attributes: ['firstname', 'lastname', 'id'],
			},
			{
				model: Request,
				required: false,
				attributes: ['getstarted'],
			},
			{
				model: User,
				required: false,
				attributes: ['firstname', 'lastname', 'email', 'id'],
			},
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
          err.message || 'Some error occurred while retrieving RoomController.',
			});
		});
};


module.exports.joinRoomEmailAndNotiForAdmin = async (req, res) => {
	const Adminuser = await Admin.findOne({where: {id: req.body.receiverId}});
	const user = await User.findOne({where: {id: req.body.senderId}});
	await recieverJoinCallEmailAdmin(Adminuser.email,user.firstname);
	const notiData = {
		title: 'User have joined call.',
		message: 'User have joined call for free consultation, Please click here to join call and continue. Ignore, if already joined.',
		senderName: (req.body.firstname ? req.body.lastname : ' '),
		senderId: req.body.senderId,
		senderType: 'APPOINTMENT',
		receiverid: req.body.receiverId,
		notificationType: WorkflowAppointment.CONSULTATION,
		target: req.body.appointmentId,
	};
	await Notifications.notificationCreate(notiData);
	if (!!user.deviceToken) {
		await Notifications.notification(user.deviceToken, 'User have joined call for free consultation, Please click here to join call and continue. Ignore, if already joined.');
	}
	return apiResponses.successResponseWithData(res, 'success');
};


module.exports.joinCallEmailAndNotiForUserAndLawyer = async (req, res) => {
	const user = await User.findOne({where: {id: req.body.receiverId}});
	await recieverJoinRoomEmail(user.email);
	const notiData = {
		title: 'User have joined call.',
		message: 'User have joined call for consultation, Please click here to join call and continue. Ignore, if already joined.',
		senderName: (req.body.firstname ? req.body.lastname : ' '),
		senderId: req.body.senderId,
		senderType: 'APPOINTMENT',
		receiverid: req.body.receiverId,
		notificationType: WorkflowAppointment.CONSULTATION,
		target: req.body.appointmentId,
	};
	await Notifications.notificationCreate(notiData);
	if (!!user.deviceToken) {
		await Notifications.notification(user.deviceToken, 'User have joined call for consultation, Please click here to join call and continue. Ignore, if already joined.');
	}
	return apiResponses.successResponseWithData(res, 'success');
};
