const {WorkflowAppointment} = require('../enum');
module.exports = (sequelize, Sequelize) => {
	return sequelize.define(
		'appointment',
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},

			queryId: {
				type: Sequelize.UUID,

			},

			adminId: {
				type: Sequelize.UUID,

			},
			customerId: {
				type: Sequelize.UUID,

			},
			lawFirmId: {
				type: Sequelize.UUID,
			},

			orderId: {
				type: Sequelize.INTEGER,
			},

			shift: {
				type: Sequelize.ENUM('morning', 'afternoon', 'evening'),
			},

			status: {
				defaultValue: WorkflowAppointment.PENDING,
				type: Sequelize.ENUM(
					WorkflowAppointment.PENDING,
					WorkflowAppointment.FREE_CONSULTATION,
					WorkflowAppointment.CONSULTATION,
					WorkflowAppointment.COMPLETED,
					WorkflowAppointment.PAYMENT,
					WorkflowAppointment.CREAT_LEAD,
					WorkflowAppointment.SCHEDULE_LEAD,
					WorkflowAppointment.APPROVE_LEAD,
					WorkflowAppointment.FURTHER_STATUS,
				),
			},

			workflow: {
				defaultValue: WorkflowAppointment.PENDING,
				type: Sequelize.ENUM(
					WorkflowAppointment.PENDING,
					WorkflowAppointment.FREE_CONSULTATION,
					WorkflowAppointment.CONSULTATION,
					WorkflowAppointment.COMPLETED,
					WorkflowAppointment.PAYMENT,
					WorkflowAppointment.CREAT_LEAD,
					WorkflowAppointment.SCHEDULE_LEAD,
					WorkflowAppointment.APPROVE_LEAD,
					WorkflowAppointment.FURTHER_STATUS,
				),
			},

			date: {
				type: Sequelize.STRING,
			},

			time: {
				type: Sequelize.STRING,
			},
			endTime: {
				type: Sequelize.STRING,
			},
			scheduleAt: {
				type: Sequelize.STRING,
			},

		},
		{
			timestamps: true,
		},
	);
};
