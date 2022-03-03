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

	app.post(
		'/api/v1/appointment/add-bulk-appointment',
		appointmentController.addBulkAppointment,
	);

	app.get(
		'/api/v1/appointment/get-appointments/:limit',
		appointmentController.getAppointments);

	app.get(
		'/api/v1/appointment/get-appointment/:id',
		appointmentController.getAppointment);

	app.get(
		'/api/v1/appointment/my-appointments/:userId',
		appointmentController.getUserAppointment);

	app.get(
		'/api/v1/appointment/my-orders/:userId',
		appointmentController.getUserAllOrders);

	app.get(
		'/api/v1/appointment/lawyer-appointments/:lawyerId',
		appointmentController.getLawyerAppointment);

	app.get(
		'/api/v1/appointment/lawyer-appointments/:lawyerId',
		appointmentController.getLawyerAppointment);

	app.get(
		'/api/v1/appointment/lawyer-appointments-monthly/:lawyerId/:startDate/:endDate',
		appointmentController.getLawyerAppointmentMonthly);

	app.get(
		'/api/v1/appointment/my-appointments-monthly/:userId/:startDate/:endDate',
		appointmentController.getUserAppointmentMonthly);

	app.get(
		'/api/v1/appointment/selected-appointments-time',
		appointmentController.getAppointmentTime);

	app.put(
		'/api/v1/appointment/status/:id',
		appointmentController.changeStatus);

	app.put(
		'/api/v1/appointment/consultation/:id/:paymentstatus',
		appointmentController.Consultation);

	app.get(
		'/api/v1/appointment/user-all-appointments/:userId',
		appointmentController.getUserLastAppointment);

	app.get(
		'/api/v1/appointment/all-appointmentsbyday/:time',
		appointmentController.getAllAppointmentByDay);

	app.get(
		'/api/v1/appointment/all-cases/:lawyerId',
		appointmentController.getAllLawyerCases);

	app.get(
		'/api/v1/appointment/all-open-cases/:lawyerId',
		appointmentController.getLawyerOpenCases);

	app.get(
		'/api/v1/appointment/all-completed-cases/:lawyerId',
		appointmentController.getLawyerCompletedCases);

	app.get(
		'/api/v1/appointment/change-Lawyer/:lawyerId/:newLawyerId',
		appointmentController.changesLawyer);

	app.post(
		'/api/v1/appointment/reschedule-appointment',
		[AppointmentValidator.rescheduleAppointmentValidator],
		appointmentController.RescheduleAppointment);

	app.put(
		'/api/v1/appointment/leadstatuscomplete/:id',
		appointmentController.LeadCompleteStatus);

	app.put(
		'/api/v1/appointment/leadcanceledstatus/:id',
		appointmentController.LeadCanceledStatus);

	app.get(
		'/api/v1/appointment/all-lawfirmcases/:lawFirmId',
		appointmentController.getAllLawfirmCases);

	app.get(
		'/api/v1/appointment/all-lawfirmpaidappointment/:lawFirmId',
		appointmentController.getAllLawfirmPaidAppointment);
	
	app.get(
		'/api/v1/appointment/my-pendingorders/:userId',
		appointmentController.getUserPendingOrders);

	app.get(
		'/api/v1/appointment/my-activeorders/:userId',
		appointmentController.getUserActiveOrders);

	app.get(
		'/api/v1/appointment/my-canceledorders/:userId',
		appointmentController.getUserCanceledOrders);

	app.get(
		'/api/v1/appointment/admin-appointments/:adminId',
		appointmentController.getAdminAppointment);
};

