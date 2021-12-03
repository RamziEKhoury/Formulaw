const scheduledCallController = require('../Controllers/scheduleCall.controller');

const AddScheduleCallValidator = require('../Validators/scheduleCall.validator');


module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept',
		);
		next();
	});

	app.post(
		'/api/v1/scheduleCall/add-scheduleCall',
		scheduledCallController.addScheduledCalls);

	app.get(
		'/api/v1/scheduleCall/get-scheduleCalls/:limit',
		scheduledCallController.getAppointments);

	app.get(
		'/api/v1/scheduleCall/get-scheduleCall/:id',
		scheduledCallController.getAppointment);

	app.get(
		'/api/v1/scheduleCall/my-scheduleCalls/:userId',
		scheduledCallController.getUserAppointment);

	app.get(
		'/api/v1/scheduleCall/lawyer-scheduleCalls/:lawyerId',
		scheduledCallController.getLawyerAppointment);

	app.get(
		'/api/v1/scheduleCall/lawyer-scheduleCalls/:lawyerId',
		scheduledCallController.getLawyerAppointment);

	app.get(
		'/api/v1/scheduleCall/lawyer-scheduleCalls-monthly/:lawFirmId/:startDate/:endDate',
		scheduledCallController.getLawyerAppointmentMonthly);

	app.get(
		'/api/v1/scheduleCall/my-scheduleCalls-monthly/:userId/:startDate/:endDate',
		scheduledCallController.getUserAppointmentMonthly);
	
};

