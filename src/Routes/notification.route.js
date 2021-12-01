const notificationController = require('../Controllers/notification.controller');
const NotificationValidator = require('../Validators/Notification.validator');

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/notification/add-notification',
		[NotificationValidator.addNotificationValidator],
		notificationController.addnotification,
	);

	  app.get(
	    '/api/v1/notification/user-notifications/:id',
	    notificationController.userNotifications,
	  );

	app.put(
		'/api/v1/notification/update-notification/:id',
		[NotificationValidator.updateNotificationValidator],
		notificationController.updatenotification,
	);
	app.delete(
		'/api/v1/notification/delete-notification/:id',
		notificationController.deletenotification,
	);

	app.get(
		'/api/v1/notification/view-read/:id',
		notificationController.readnotification,
	);
	app.get(
		'/api/v1/notification/view-unread/:id',
		notificationController.unreadnotification,
	);

	app.get(
		'/api/v1/notification/view-countread/:id',
		notificationController.countreadnotification,
	);
	app.get(
		'/api/v1/notification/view-countunread/:id',
		notificationController.countunreadnotification,
	);

	app.get(
		'/api/v1/notification/markOneRead/:id',
		notificationController.markOneRead,
	);

	app.get(
		'/api/v1/notification/markAllRead/:id',
		notificationController.markAllRead,
	);

	app.get(
		'/api/v1/notification/delete-all/:id',
		notificationController.deletenotification,
	);
};
