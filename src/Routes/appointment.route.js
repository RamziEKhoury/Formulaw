const appointmentController = require('../Controllers/appointment.controller');

const AppointmentValidator = require('../Validators/appointment.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/appointment/add-appointment',
		[AppointmentValidator.addAppointmentValidator],
		appointmentController.addAppointment,
	);

	app.get(
		'/api/v1/appointment/get-appointments/:limit',
		appointmentController.getAppointments);

	app.get(
		'/api/v1/appointment/get-appointment/:id',
		appointmentController.getAppointment);
};
