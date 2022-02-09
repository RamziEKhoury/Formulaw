const roomController = require('../Controllers/Room.controller');

// const ServiceValidator = require('../Validators/Services.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.get(
		'/api/v1/room/get-room-by-appointmentId/:appointmentId',
		roomController.getRoomByAppointmentId,
	);

	app.get(
		'/api/v1/room/get-room-by-id/:id',
		roomController.getRoomById,
	);

	app.get(
		'/api/v1/room/get-rooms',
		roomController.getRooms,
	);

	app.post(
		'/api/v1/room/send-mail-admin',
		roomController.joinRoomEmailAndNotiForAdmin,
	);

	app.post(
		'/api/v1/room/send-mail-user-lawyer',
		roomController.joinCallEmailAndNotiForUserAndLawyer,
	);
};
