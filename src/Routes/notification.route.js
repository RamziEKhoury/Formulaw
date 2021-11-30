const notificationController = require('../Controllers/notification.controller');
const NotificationValidator = require('../Validators/Notification.validator');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post(
    '/api/v1/notification/add-notification',
    [NotificationValidator.addNotificationValidator],
    notificationController.addnotification
  );

  //   app.get(
  //     '/api/v1/notification/view-testimonial/:id',
  //     notificationController.viewtestimonial
  //   );

  app.put(
    '/api/v1/notification/update-notification/:id',
    [NotificationValidator.updateNotificationValidator],
    notificationController.updatenotification
  );
  app.delete(
    '/api/v1/notification/delete-notification/:id',
    notificationController.deletenotification
  );

  app.put(
    '/api/v1/notification/read/:id',
    notificationController.readnotification
  );
  app.get(
    '/api/v1/notification/view-unread/:id',
    notificationController.unreadnotification
  );

  app.get(
    '/api/v1/notification/view-countread/:id',
    notificationController.countreadnotification
  );
  app.get(
    '/api/v1/notification/view-countunread/:id',
    notificationController.countunreadnotification
  );
};
