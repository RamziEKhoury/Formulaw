const db = require('../models');
const Notification = db.notification;

const apiResponses = require('../Components/apiresponse');

module.exports.addnotification = async (req, res) => {
	try {
		console.log(req.body);
		Notification.create({
			title: req.body.title,
			message: req.body.message,
			senderName: req.body.senderName,
			senderId: req.body.senderId,
			senderType: req.body.senderType,
			receiverid: req.body.receiverid,
			notificationType: req.body.notificationType,
			target: req.body.target,
		}).then((notification) => {
			const notificationData = {
				id: notification.id,
				title: notification.title,
				message: notification.message,
				senderName: notification.senderName,
				senderId: notification.senderId,
				senderType: notification.senderType,
				receiverid: notification.receiverid,
				notificationType: notification.notificationType,
				status: notification.status,
				target: notification.target,
			};
			return apiResponses.successResponseWithData(
				res,
				'Testimonial Created successfully!',
				notificationData,
			);
		});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.updatenotification = async (req, res) => {
	try {
		await Notification.update(
			{
				//  id: req.body.id,
				title: req.body.title,
				message: req.body.message,
				senderName: req.body.senderName,
				senderId: req.body.senderId,
				senderType: req.body.senderType,
				receiverid: req.body.receiverid,
				notificationType: req.body.notificationType,
				status: req.body.status,
				target: req.body.target,
			},
			{where: {id: req.params.id}},
		)
			.then((notification) => {
				if (!notification) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}

				return apiResponses.successResponseWithData(
					res,
					'Success',
					notification,
				);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.markOneRead = async (req, res) => {
	try {
		await Notification.update(
			{
				status: true,
			},
			{where: {id: req.params.id}},
		)
			.then((notification) => {
				if (!notification) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}

				return apiResponses.successResponseWithData(
					res,
					'Success',
					notification,
				);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.markAllRead = async (req, res) => {
	try {
		await Notification.update(
			{
				status: true,
			},
			{where: {receiverid: req.params.id}},
		)
			.then((notification) => {
				if (!notification) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}

				return apiResponses.successResponseWithData(
					res,
					'Success',
					notification,
				);
			})
			.catch((err) => {
				return apiResponses.errorResponse(res, err.message, {});
			});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.deletenotification = async (req, res) => {
	try {
		await Notification.destroy({where: {receiverid: req.params.id}})
			.then((notification) => {
				if (!notification) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}

				return apiResponses.successResponseWithData(
					res,
					'Success',
					notification,
				);
			})
			.catch((err) => {});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.deleteAll = async (req, res) => {
	try {
		await Notification.destroy({where: {receiverid: req.params.id}})
			.then((notification) => {
				if (!notification) {
					return apiResponses.notFoundResponse(res, 'Not found.', {});
				}

				return apiResponses.successResponseWithData(
					res,
					'Success',
					notification,
				);
			})
			.catch((err) => {});
	} catch (err) {
		return apiResponses.errorResponse(res, err);
	}
};

module.exports.readnotification = (req, res) => {
	console.log(req.params);

	Notification.findAll({
		where: {
			receiverid: req.params.id,
			status: true,
		},
		order: [['createdAt', 'DESC']],
	})
		.then((notification) => {
			if (!notification) {
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}

			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				notification,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};

module.exports.unreadnotification = (req, res) => {
	console.log(req.params);

	Notification.findAll({
		where: {
			receiverid: req.params.id,
			status: false,
		},
		order: [['createdAt', 'DESC']],
	})
		.then((notification) => {
			if (!notification) {
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}

			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				notification,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};

module.exports.userNotifications = (req, res) => {
	console.log(req.params);

	Notification.findAll({
		where: {
			receiverid: req.params.id,
		},
		order: [['createdAt', 'DESC']],
	})
		.then((notification) => {
			if (!notification) {
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}

			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				notification,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};

module.exports.countreadnotification = (req, res) => {
	console.log(req.params);

	Notification.findAndCountAll({
		where: {
			receiverid: req.params.id,
			status: true,
		},
		order: [['createdAt', 'DESC']],
	})
		.then((notification) => {
			if (!notification) {
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}

			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				notification,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};

module.exports.countunreadnotification = (req, res) => {
	console.log(req.params);

	Notification.findAndCountAll({
		where: {
			receiverid: req.params.id,
			status: false,
		},
		order: [['createdAt', 'DESC']],
	})
		.then((notification) => {
			if (!notification) {
				return apiResponses.notFoundResponse(res, 'Data Not found.', null);
			}

			return apiResponses.successResponseWithData(
				res,
				'successfully found!',
				notification.count,
			);
		})
		.catch((err) => {
			return apiResponses.errorResponse(res, err.message, err);
		});
};
